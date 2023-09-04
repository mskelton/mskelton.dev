// import rehypeShiki from "@stefanprobst/rehype-shiki"
import { compileMDX } from "next-mdx-remote/rsc"
// import path from "node:path"
import { cache } from "react"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { getByteSource } from "lib/api/bytes"
import prisma from "lib/prisma"
// import { getHighlighter } from "../../../config/highlighter.mjs"
import rehypeCodeA11y from "../../../config/rehype-code-a11y.mjs"
import rehypeCodeTitles from "../../../config/rehype-code-titles.mjs"
import rehypeHeaderId from "../../../config/rehype-header-id.mjs"
import rehypeHeadings from "../../../config/rehype-headings.mjs"
import remarkCodeTitles from "../../../config/remark-code-titles.mjs"
import { ByteMeta } from "./types"

// Revalidate the data at most every hour
export const revalidate = 3600

export const getByte = cache(async (slug: string) => {
  // const themePath = path.join(process.cwd(), "config/tokyonight.json")
  // const highlighter = await getHighlighter(themePath)

  const source = await getByteSource(slug)
  const { content, frontmatter } = await compileMDX<ByteMeta>({
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          rehypeHeadings,
          rehypeHeaderId,
          rehypeCodeTitles,
          // [rehypeShiki, { highlighter }],
          rehypeCodeA11y,
        ],
        remarkPlugins: [remarkGfm, remarkSmartypants, remarkCodeTitles],
      },
      parseFrontmatter: true,
    },
    source,
  })

  return { content, meta: frontmatter }
})

export interface SearchBytesRequest {
  query?: string
  tag?: string
}

export const searchBytes = cache(async ({ query, tag }: SearchBytesRequest) => {
  const res = await prisma.byte.findMany({
    include: { tags: true },
    take: 10,
    where: {
      tags: tag ? { some: { name: { equals: tag } } } : undefined,
      title: query ? { contains: query } : undefined,
    },
  })

  return res
})
