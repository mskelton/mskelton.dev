import rehypeShiki from "@mskelton/rehype-shiki"
import { and, asc, desc, eq, gt, like, lt, or, sql } from "drizzle-orm"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { getHighlighter, Highlighter } from "shiki"
import { db, schema } from "lib/db"
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

export const getByte = cache(async (slug: string) => {
  const byte = await db.query.bytes.findFirst({
    where: or(eq(schema.bytes.id, slug), eq(schema.bytes.slug, slug)),
  })

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
    highlighter = await getHighlighter({
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

  return { ...byte, content }
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

export function getAllBytes() {
  return db
    .select({
      createdAt: schema.bytes.createdAt,
      description: schema.bytes.description,
      id: schema.bytes.id,
      slug: schema.bytes.slug,
      title: schema.bytes.title,
    })
    .from(schema.bytes)
    .orderBy(desc(schema.bytes.createdAt))
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
    const res = await db
      .select({
        createdAt: schema.bytes.createdAt,
        description: schema.bytes.description,
        id: schema.bytes.id,
        slug: schema.bytes.slug,
        tags: sql`json_group_array(json_object('id', ${schema.tags.id}, 'name', ${schema.tags.name}))`.mapWith(
          (val) => JSON.parse(val) as { id: string; name: string }[],
        ),
        title: schema.bytes.title,
      })
      .from(schema.bytes)
      .innerJoin(
        schema.bytesToTags,
        eq(schema.bytesToTags.byteId, schema.bytes.id),
      )
      .innerJoin(schema.tags, eq(schema.bytesToTags.tagId, schema.tags.id))
      .where(
        and(
          cursor
            ? direction === "left"
              ? gt(schema.bytes.id, cursor)
              : lt(schema.bytes.id, cursor)
            : undefined,
          query
            ? or(
                like(schema.bytes.title, `%${query}%`),
                like(schema.bytes.description, `%${query}%`),
              )
            : undefined,
          tag ? eq(schema.tags.name, tag) : undefined,
        ),
      )
      .groupBy(schema.bytes.id)
      // To know if there are more pages, we fetch one more record than we need
      // and use the total count to determine if there are more pages. This has
      // to account for the cursor direction as well.
      .limit(PAGE_SIZE + 1)
      // When paging backwards, we have to sort backwards to allow our limit
      // to work correctly.
      .orderBy((direction === "left" ? asc : desc)(schema.bytes.id))
      .execute()

    const prefix = getPrefix({ query, tag })
    const hasMore = res.length > PAGE_SIZE

    // Since we fetch extra records, we need to slice the result to the correct size.
    const bytes = res.slice(0, PAGE_SIZE)

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
