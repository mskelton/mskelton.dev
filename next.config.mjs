import nextMDX from "@next/mdx"
import { fileURLToPath } from "node:url"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkSmartypants from "remark-smartypants"
import shiki from "shiki"
import { redirects, rewrites } from "./config/redirects.mjs"
import rehypeCallout from "./config/rehype-callout.mjs"
import rehypeCodeMeta from "./config/rehype-code-meta.mjs"
import rehypeCodeTitles from "./config/rehype-code-titles.mjs"
import rehypeHeaderId from "./config/rehype-header-id.mjs"
import rehypeHeadings from "./config/rehype-headings.mjs"
import rehypeShiki from "./config/rehype-shiki.mjs"
import remarkAutoImagePath from "./config/remark-auto-image-path.mjs"
import remarkCodeBlock from "./config/remark-code-block.mjs"
import remarkDemo from "./config/remark-demo.mjs"
import remarkFrontmatterMetadata from "./config/remark-frontmatter-metadata.mjs"

/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "components", "config", "e2e"],
  },
  images: {
    minimumCacheTTL: 3600, // 1 hour
  },
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  redirects: () => Promise.resolve(redirects),
  rewrites: () => Promise.resolve(rewrites),
}

const themeURL = new URL("./config/tokyonight.json", import.meta.url)
const highlighter = await shiki.getHighlighter({
  theme: await shiki.loadTheme(fileURLToPath(themeURL)),
})

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeSlug,
      rehypeHeadings,
      rehypeHeaderId,
      rehypeCodeTitles,
      [rehypeShiki, { highlighter }],
      rehypeCodeMeta,
      rehypeCallout,
    ],
    remarkPlugins: [
      remarkGfm,
      remarkSmartypants,
      remarkFrontmatterMetadata,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "meta" }],
      remarkAutoImagePath,
      remarkDemo,
      remarkCodeBlock,
    ],
  },
})

export default withMDX(nextConfig)
