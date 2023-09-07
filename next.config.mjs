import nextMDX from "@next/mdx"
import rehypeShiki from "@stefanprobst/rehype-shiki"
import { fileURLToPath } from "node:url"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkSmartypants from "remark-smartypants"
import { getHighlighter } from "./config/highlighter.mjs"
import rehypeCodeA11y from "./config/rehype-code-a11y.mjs"
import rehypeCodeTitles from "./config/rehype-code-titles.mjs"
import rehypeHeaderId from "./config/rehype-header-id.mjs"
import rehypeHeadings from "./config/rehype-headings.mjs"
import remarkAutoImagePath from "./config/remark-auto-image-path.mjs"
import remarkCodeTitles from "./config/remark-code-titles.mjs"
import remarkFrontmatterMetadata from "./config/remark-frontmatter-metadata.mjs"
import remarkLayout from "./config/remark-layout.mjs"

/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "components", "config", "e2e"],
  },
  experimental: {
    serverComponentsExternalPackages: ["shiki"],
  },
  images: {
    minimumCacheTTL: 3600, // 1 hour
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
}

const themeURL = new URL("./config/tokyonight.json", import.meta.url)
const highlighter = await getHighlighter(fileURLToPath(themeURL))

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeSlug,
      rehypeHeadings,
      rehypeHeaderId,
      rehypeCodeTitles,
      [rehypeShiki, { highlighter }],
      rehypeCodeA11y,
    ],
    remarkPlugins: [
      remarkGfm,
      remarkSmartypants,
      remarkFrontmatterMetadata,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "meta" }],
      remarkLayout,
      remarkCodeTitles,
      remarkAutoImagePath,
    ],
  },
})

export default withMDX(nextConfig)
