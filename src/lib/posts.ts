import prism from "@mapbox/rehype-prism"
import smartypants from "@silvenon/remark-smartypants"
import fs from "fs"
import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import path from "path"
import readingTime from "reading-time"

export type BlogPostMeta = Record<
  "date" | "excerpt" | "slug" | "title" | "readingTime",
  string
>

const postsDirectory = path.join(process.cwd(), "src/posts")

export async function getPostSlugs() {
  const filenames = await fs.promises.readdir(postsDirectory)
  return filenames.map((filename) => filename.replace(/\.md$/, ""))
}

async function getPostContent(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  return fs.promises.readFile(fullPath, "utf8")
}

export async function getPostBySlug(slug: string) {
  const content = await getPostContent(slug)

  return bundleMDX(content, {
    xdmOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [prism, { alias: { bash: "sh" } }],
      ]
      options.remarkPlugins = [...(options.remarkPlugins ?? []), smartypants]

      return options
    },
  })
}

async function getPostMeta(slug: string): Promise<BlogPostMeta> {
  const fileContent = await getPostContent(slug)
  const { content, data } = matter(fileContent)

  return {
    ...data,
    readingTime: readingTime(content).text,
    slug,
  } as BlogPostMeta
}

export async function getPosts(count?: number) {
  const slugs = await getPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostMeta(slug)))

  // Sort posts by date in descending order
  return posts
    .sort((post1, post2) =>
      new Date(post1.date) > new Date(post2.date) ? -1 : 1
    )
    .slice(0, count)
}
