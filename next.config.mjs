import rehypeShiki from "@mskelton/rehype-shiki"
import remarkExtractFrontmatter from "@mskelton/remark-extract-frontmatter"
import createMDX from "@next/mdx"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkSmartypants from "remark-smartypants"
import { rehypeShikiOptions } from "./config/highlighter.mjs"
import { redirects, rewrites } from "./config/redirects.mjs"
import rehypeCallout from "./config/rehype-callout.mjs"
import rehypeCodeMeta from "./config/rehype-code-meta.mjs"
import rehypeCodeTitles from "./config/rehype-code-titles.mjs"
import rehypeHeaderId from "./config/rehype-header-id.mjs"
import rehypeHeadings from "./config/rehype-headings.mjs"
import rehypeParseCodeMeta from "./config/rehype-parse-code-meta.mjs"
import remarkAutoImagePath from "./config/remark-auto-image-path.mjs"
import remarkCodeBlock from "./config/remark-code-block.mjs"

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 3600, // 1 hour
  },
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  redirects: async () => redirects,
  rewrites: async () => rewrites,
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeSlug,
      rehypeHeadings,
      rehypeHeaderId,
      rehypeParseCodeMeta,
      [rehypeShiki, rehypeShikiOptions],
      rehypeCodeTitles,
      rehypeCodeMeta,
      rehypeCallout,
    ],
    remarkPlugins: [
      remarkGfm,
      remarkSmartypants,
      remarkExtractFrontmatter,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "meta" }],
      remarkAutoImagePath,
      remarkCodeBlock,
    ],
  },
})

export default withMDX(nextConfig)
