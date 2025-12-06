import createMDX from "@next/mdx"
import { rehypeShikiOptions } from "./config/highlighter.mjs"
import { redirects, rewrites } from "./config/redirects.mjs"

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
      "rehype-slug",
      "unified-plugins/rehype-headings",
      "unified-plugins/rehype-header-id",
      "unified-plugins/rehype-parse-code-meta",
      ["@mskelton/rehype-shiki", rehypeShikiOptions],
      "unified-plugins/rehype-code-titles",
      "unified-plugins/rehype-code-meta",
      "unified-plugins/rehype-callout",
    ],
    remarkPlugins: [
      "remark-gfm",
      "remark-smartypants",
      "@mskelton/remark-extract-frontmatter",
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "meta" }],
      "unified-plugins/remark-auto-image-path",
      "unified-plugins/remark-code-block",
    ],
  },
})

export default withMDX(nextConfig)
