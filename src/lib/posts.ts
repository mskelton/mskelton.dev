import fs from "fs"
import matter from "gray-matter"
import path from "path"
import rehypeHighlight from "rehype-highlight"
import { bundleMDX } from "mdx-bundler"

export type BlogPostMeta = Record<
  "date" | "excerpt" | "slug" | "title" | "time",
  string
>

const postsDirectory = path.join(process.cwd(), "src/posts")

async function getPostSlugs() {
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
    grayMatterOptions(options) {
      options.excerpt = true
      return options
    },
    xdmOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeHighlight,
      ]

      return options
    },
  })
}

async function getPostMeta(slug: string): Promise<BlogPostMeta> {
  const fileContent = await getPostContent(slug)

  return {
    ...(matter(fileContent).data as BlogPostMeta),
    slug,
  }
}

export async function getPosts(count: number | undefined) {
  const slugs = await getPostSlugs()
  const posts = await Promise.all(
    slugs.slice(0, count).map((slug) => getPostMeta(slug))
  )

  // Sort posts by date in descending order
  return posts.sort((post1, post2) =>
    new Date(post1.date) > new Date(post2.date) ? -1 : 1
  )
}
