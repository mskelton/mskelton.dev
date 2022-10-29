import nextMDX from "@next/mdx"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkCodeTitles from "./config/remark-code-titles.mjs"
import remarkLayout from "./config/remark-layout.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src"],
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
  swcMinify: true,
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
          properties: {
            ariaHidden: true,
            class: "heading-link",
            tabIndex: -1,
          },
        },
      ],
      [rehypePrismPlus, { ignoreMissing: true }],
    ],
    remarkPlugins: [
      remarkGfm,
      remarkCodeTitles,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "meta" }],
      remarkLayout,
    ],
  },
})

export default withMDX(nextConfig)
