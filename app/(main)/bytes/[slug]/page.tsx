import rehypeShiki from "@stefanprobst/rehype-shiki"
import { compileMDX } from "next-mdx-remote/rsc"
import path from "node:path"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { getHighlighter } from "../../../../config/highlighter.mjs"
import rehypeCodeA11y from "../../../../config/rehype-code-a11y.mjs"
import rehypeCodeTitles from "../../../../config/rehype-code-titles.mjs"
import rehypeHeaderId from "../../../../config/rehype-header-id.mjs"
import rehypeHeadings from "../../../../config/rehype-headings.mjs"
import remarkCodeTitles from "../../../../config/remark-code-titles.mjs"
import { ArticleLayout } from "../../../components/layouts/ArticleLayout"
import { getByte } from "../api"
import { ByteMeta } from "../types"

export default async function Page({ params }: { params: { slug: string } }) {
  const themePath = path.join(process.cwd(), "config/tokyonight.json")
  const highlighter = await getHighlighter(themePath)
  const source = await getByte(params.slug)

  const { content, frontmatter } = await compileMDX<ByteMeta>({
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          rehypeHeadings,
          rehypeHeaderId,
          rehypeCodeTitles,
          [rehypeShiki, { highlighter }],
          rehypeCodeA11y,
        ],
        remarkPlugins: [remarkGfm, remarkSmartypants, remarkCodeTitles],
      },
      parseFrontmatter: true,
    },
    source,
  })

  return (
    <ArticleLayout backHref="/bytes" meta={frontmatter}>
      {content}
    </ArticleLayout>
  )
}
