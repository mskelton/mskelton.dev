import rehypeShiki from "@mskelton/rehype-shiki"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { createHighlighter, Highlighter } from "shiki"
import { client } from "lib/db"
import MarkdownImage from "../../../components/markdown/MarkdownImage"
import MarkdownLink from "../../../components/markdown/MarkdownLink"
import MarkdownPre from "../../../components/markdown/MarkdownPre"
import {
  langAlias,
  langs,
  themeMap,
  themes,
} from "../../../config/highlighter.mjs"
import rehypeCallout from "../../../config/rehype-callout.mjs"
import rehypeCodeMeta from "../../../config/rehype-code-meta.mjs"
import rehypeCodeTitles from "../../../config/rehype-code-titles.mjs"
import rehypeHeaderId from "../../../config/rehype-header-id.mjs"
import config from "../../../config/rehype-headings.mjs"
import rehypeParseCodeMeta from "../../../config/rehype-parse-code-meta.mjs"
import { ByteMeta } from "./types"

// Revalidate the data at most every hour
export const revalidate = 3600

let highlighter: Highlighter | null

const loadLocalByteContent = async (id: string) => {
  const dir = process.env.BYTES_DIR
  if (!dir) return

  try {
    const filename = path.join(dir, "bytes", `${id}.md`)
    const raw = await fs.readFile(filename, "utf8")
    const { content } = matter(raw)

    return Buffer.from(content)
  } catch {
    console.warn("Could not load local byte content. Falling back to database.")
  }
}

type Byte = {
  content: string | Buffer
  created_at: Date
  description: string
  id: string
  slug: string
  tags: Tag[]
  title: string
}

type Tag = {
  id: string
  name: string
}

function parseByte(byte: any): Byte {
  return {
    ...byte,
    created_at: new Date(byte.created_at),
    tags: byte.tags ? (JSON.parse(byte.tags) as Tag[]) : undefined,
  }
}

export const getByte = cache(async (slug: string) => {
  const byte = client
    .prepare<
      { slug: string },
      Byte
    >(`select * from bytes where id = @slug or slug = @slug`)
    .get({ slug })

  if (!byte) {
    notFound()
  }

  // If running locally, attempt to load the byte content from the local
  // file system. This allows for easier development of bytes before publishing
  // the final content to the database.
  if (process.env.NODE_ENV === "development") {
    byte.content = (await loadLocalByteContent(byte.id)) ?? byte.content
  }

  // Load the highlighter once and reuse it for all requests. Hopefully this
  // fixes the memory leak issue with shiki and vscode-oniguruma.
  if (!highlighter) {
    highlighter = await createHighlighter({
      langAlias,
      langs,
      themes: themes as any,
    })
  }

  const { content } = await compileMDX<ByteMeta>({
    components: {
      a: MarkdownLink,
      img: MarkdownImage,
      pre: MarkdownPre as any,
    },
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          config,
          rehypeHeaderId,
          rehypeParseCodeMeta,
          [rehypeShiki as any, { highlighter, themes: themeMap }],
          rehypeCodeTitles,
          rehypeCodeMeta,
          rehypeCallout as any,
        ],
        remarkPlugins: [remarkGfm, remarkSmartypants as any],
      },
    },
    source: byte.content as string,
  })

  return parseByte({ ...byte, content })
})

export type Direction = "left" | "none" | "right"

/**
 * Returns the prefix for the bytes page with any query parameters. This ensures
 * that we maintain search state when navigating between pages.
 */
function getPrefix({ query, tag }: Pick<SearchBytesRequest, "query" | "tag">) {
  const params = new URLSearchParams()

  if (tag) params.set("tag", tag ?? "")
  if (query) params.set("query", query ?? "")

  const str = params.toString()
  return `/bytes?${str + (str ? "&" : "")}`
}

export async function getAllBytes() {
  return client
    .prepare<unknown[], Byte>(`select * from bytes order by created_at desc`)
    .all()
}

export interface SearchBytesRequest {
  cursor?: string
  direction: Direction
  query?: string
  tag?: string
}

export const PAGE_SIZE = 10

export const searchBytes = cache(
  async ({ cursor, direction, query, tag }: SearchBytesRequest) => {
    const where = [
      cursor ? `bytes.id ${direction === "left" ? ">" : "<"} @cursor` : "",
      query ? `(bytes.title like @query or bytes.description like @query)` : "",
      tag ? `tags.name = @tag` : "",
    ]
      .filter(Boolean)
      .join(" and ")

    const res = client
      .prepare<{
        cursor?: string
        query?: string
        tag?: string
      }>(
        `
          select bytes.*, json_group_array(json_object('id', tags.id, 'name', tags.name)) as tags
          from bytes
          inner join bytes_to_tags on bytes.id = bytes_to_tags.byte_id
          inner join tags on tags.id = bytes_to_tags.tag_id
          ${where ? `where ${where}` : ""}
          group by bytes.id
          -- When paging backwards, we have to sort backwards to allow our limit
          -- to work correctly.
          order by bytes.id ${direction === "left" ? "asc" : "desc"}
          -- To know if there are more pages, we fetch one more record than we need
          -- and use the total count to determine if there are more pages. This has
          -- to account for the cursor direction as well.
          limit ${PAGE_SIZE + 1}
        `,
      )
      .all({ cursor, query: `%${query}%`, tag })

    const prefix = getPrefix({ query, tag })
    const hasMore = res.length > PAGE_SIZE

    // Since we fetch extra records, we need to slice the result to the correct size.
    const bytes = res.slice(0, PAGE_SIZE).map(parseByte)

    // If paging backwards, we need to reverse the result set to maintain the
    // correct order. Mutating arrays isn't that cool, but what do I care about
    // being cool, I know what I'm doing.
    if (direction === "left") {
      bytes.reverse()
    }

    return {
      bytes,
      nextHref:
        // The next button is enabled when we are moving left, or there are more
        // pages to the right.
        direction === "left" || hasMore
          ? `${prefix}after=${bytes.at(-1)?.id}`
          : undefined,
      prevHref:
        // The previous button is enabled when we are moving right, or there
        // are more pages to the left.
        direction === "right" || (direction === "left" && hasMore)
          ? `${prefix}before=${bytes.at(0)?.id}`
          : undefined,
    }
  },
)
