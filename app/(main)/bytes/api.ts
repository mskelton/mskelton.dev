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
import rehypeCodeMeta from "../../../config/rehype-code-meta.mjs"
import rehypeCodeTitles from "../../../config/rehype-code-titles.mjs"
import rehypeHeaderId from "../../../config/rehype-header-id.mjs"
import rehypeHeadings from "../../../config/rehype-headings.mjs"
import remarkCodeMeta from "../../../config/remark-code-meta.mjs"
import { ByteMeta } from "./types"

// Revalidate the data at most every hour
export const revalidate = 3600

export const getByte = cache(async (slug: string) => {
  const byte = await prisma.byte.findUnique({ where: { slug } })
  if (!byte) {
    notFound()
  }

  byte.content = `
    \`\`\`javascript
    const a = 1
    const b = 2
    console.log(a + b)

    const a = 1
    const b = 2
    console.log(a + b)
    \`\`\`

    \`\`\`javascript just-title.js
    const a = 1
    const b = 2
    console.log(a + b)

    const a = 1
    const b = 2
    console.log(a + b)
    \`\`\`

    \`\`\`javascript {1,3-4}
    const a = 1
    const b = 2
    console.log(a + b)

    const a = 1
    const b = 2
    console.log(a + b)
    \`\`\`

    \`\`\`javascript {1, 2-3} title.yml
    const a = 1
    const b = 2
    console.log(a + b)

    const a = 1
    const b = 2
    console.log(a + b)
    \`\`\`
  `

  const { content } = await compileMDX<ByteMeta>({
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
