import nextMDX from "@next/mdx"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkSmartypants from "remark-smartypants"
import rehypeCodeTitles from "./config/rehype-code-titles.mjs"
import remarkLayout from "./config/remark-layout.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src", "config", "e2e"],
  },
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  images: {
    minimumCacheTTL: 3600, // 1 hour
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
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
      [rehypePrismPlus, { ignoreMissing: true }],
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
