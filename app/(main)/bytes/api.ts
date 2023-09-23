import rehypeShiki from "@stefanprobst/rehype-shiki"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { cache } from "react"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { getHighlighter } from "lib/mdx"
import prisma from "lib/prisma"
import MarkdownImage from "../../../components/markdown/MarkdownImage"
import MarkdownLink from "../../../components/markdown/MarkdownLink"
import MarkdownPre from "../../../components/markdown/MarkdownPre"
import rehypeCodeA11y from "../../../config/rehype-code-a11y.mjs"
import rehypeCodeMeta from "../../../config/rehype-code-meta.mjs"
import rehypeCodeTitles from "../../../config/rehype-code-titles.mjs"
import rehypeHeaderId from "../../../config/rehype-header-id.mjs"
import rehypeHeadings from "../../../config/rehype-headings.mjs"
import remarkCodeMeta from "../../../config/remark-code-meta.mjs"
import { ByteMeta } from "./types"

// Revalidate the data at most every hour
export const revalidate = 3600

export const getByte = cache(async (slug: string) => {
  const byte = await prisma.byte.findFirst({
    where: {
      OR: [{ id: slug }, { slug }],
    },
  })
  if (!byte) {
    notFound()
  }

  const { content } = await compileMDX<ByteMeta>({
    components: {
      a: MarkdownLink,
      img: MarkdownImage,
      pre: MarkdownPre,
    },
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          rehypeHeadings,
          rehypeHeaderId,
          rehypeCodeTitles,
          [rehypeShiki, { highlighter: await getHighlighter() }],
          rehypeCodeMeta,
          rehypeCodeA11y,
        ],
        remarkPlugins: [remarkGfm, remarkSmartypants as any, remarkCodeMeta],
      },
    },
    source: byte.content,
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
  return prisma.byte.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      createdAt: true,
      description: true,
      id: true,
      slug: true,
      title: true,
    },
  })
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
    const res = await prisma.byte.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        createdAt: true,
        description: true,
        id: true,
        slug: true,
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        title: true,
      },
      // When using a cursor, we want to skip the current record since we don't
      // want it on multiple pages. This doesn't apply when we are on the root
      // page without a cursor.
      skip: direction === "none" ? undefined : 1,
      // To know if there are more pages, we fetch one more record than we need
      // and use the total count to determine if there are more pages. This has
      // to account for the cursor direction as well.
      take: (direction === "left" ? -1 : 1) * (PAGE_SIZE + 1),
      // Search by tag, or by title/description
      where: {
        OR: query
          ? [
              { title: { contains: query } },
              { description: { contains: query } },
            ]
          : undefined,
        tags: tag ? { some: { name: { equals: tag } } } : undefined,
      },
    })

    const prefix = getPrefix({ query, tag })
    const hasMore = res.length > PAGE_SIZE

    // Since we fetch extra records, we need to slice the result to the correct
    // size. Again, we have to account for cursor direction and trim the first
    // or last item accordingly.
    const start = direction === "left" && hasMore ? 1 : 0
    const bytes = res.slice(start, start + PAGE_SIZE)

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
