import nextMDX from "@next/mdx"
import rehypeShiki from "@stefanprobst/rehype-shiki"
import { fileURLToPath } from "node:url"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkSmartypants from "remark-smartypants"
import shiki from "shiki"
import rehypeCodeA11y from "./config/rehype-code-a11y.mjs"
import rehypeCodeTitles from "./config/rehype-code-titles.mjs"
import remarkCodeTitles from "./config/remark-code-titles.mjs"
import remarkFrontmatterMetadata from "./config/remark-frontmatter-metadata.mjs"
import remarkLayout from "./config/remark-layout.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "config", "e2e", "src"],
  },
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
  images: {
    minimumCacheTTL: 3600, // 1 hour
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
}

const themeURL = new URL("./config/tokyonight.json", import.meta.url)
const theme = await shiki.loadTheme(fileURLToPath(themeURL))
const highlighter = await shiki.getHighlighter({ theme })

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          content: {
            children: [],
            properties: {
              className: [
                "relative",
                "md:before:content-['#']",
                "before:absolute",
                "before:right-2",
              ],
            },
            tagName: "span",
            type: "element",
          },
        },
      ],
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
    ],
  },
})

export default withMDX(nextConfig)
