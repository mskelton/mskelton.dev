import nextMDX from "@next/mdx"
import rehypeShiki from "@stefanprobst/rehype-shiki"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkSmartypants from "remark-smartypants"
import shiki from "shiki"
import { fileURLToPath } from "url"
import rehypeCodeTitles from "./config/rehype-code-titles.mjs"
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
    ],
    remarkPlugins: [
      remarkGfm,
      remarkSmartypants,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "meta" }],
      remarkLayout,
    ],
  },
})

export default withMDX(nextConfig)
