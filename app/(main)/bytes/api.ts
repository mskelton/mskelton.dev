import rehypeShiki from "@stefanprobst/rehype-shiki"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { cache } from "react"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { getHighlighter } from "lib/mdx"
import prisma from "lib/prisma"
import rehypeCodeA11y from "../../../config/rehype-code-a11y.mjs"
import rehypeCodeTitles from "../../../config/rehype-code-titles.mjs"
import rehypeHeaderId from "../../../config/rehype-header-id.mjs"
import rehypeHeadings from "../../../config/rehype-headings.mjs"
import remarkCodeTitles from "../../../config/remark-code-titles.mjs"
import { ByteMeta } from "./types"

// Revalidate the data at most every hour
export const revalidate = 3600

export const getByte = cache(async (slug: string) => {
  const byte = await prisma.byte.findUnique({ where: { slug } })
  if (!byte) {
    notFound()
  }

  const { content } = await compileMDX<ByteMeta>({
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          rehypeHeadings,
          rehypeHeaderId,
          rehypeCodeTitles,
          [rehypeShiki, { highlighter: await getHighlighter() }],
          rehypeCodeA11y,
        ],
        remarkPlugins: [remarkGfm, remarkSmartypants as any, remarkCodeTitles],
      },
    },
    source: byte.content,
  })

  return { ...byte, content }
})

export interface SearchBytesRequest {
  query?: string
  tag?: string
}

export const searchBytes = cache(async ({ query, tag }: SearchBytesRequest) => {
  const res = await prisma.byte.findMany({
    include: { tags: true },
    orderBy: { createdAt: "desc" },
    take: 10,
    where: {
      tags: tag ? { some: { name: { equals: tag } } } : undefined,
      title: query ? { contains: query } : undefined,
    },
  })

  return res
})
