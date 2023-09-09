import glob from "fast-glob"
import { Feed } from "feed"
import matter from "gray-matter"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "url"
import { PostMeta } from "../app/components/layouts/PostLayout.jsx"
import { siteMeta } from "../app/lib/siteMeta.js"

const baseURL = new URL("../app/(main)/blog/posts/", import.meta.url)

async function readFrontmatter(filename: string) {
  const content = await fs.readFile(new URL(filename, baseURL), "utf8")
  const frontmatter = matter(content)

  return {
    ...(frontmatter.data as PostMeta),
    slug: path.basename(filename, path.extname(filename)),
  }
}

async function getAllPosts() {
  const cwd = fileURLToPath(baseURL)
  const filenames = await glob("*.{md,mdx}", { cwd })
  const posts = await Promise.all(filenames.map(readFrontmatter))

  return posts.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime(),
  )
}

const posts = await getAllPosts()
const author = { email: siteMeta.email, name: "Mark Skelton" }

const feed = new Feed({
  author,
  copyright: `All rights reserved ${new Date().getFullYear()}`,
  description: siteMeta.tagline,
  favicon: `${siteMeta.url}/favicon.ico`,
  feedLinks: {
    json: `${siteMeta.url}/rss/feed.json`,
    rss2: `${siteMeta.url}/rss/feed.xml`,
  },
  id: siteMeta.url,
  image: `${siteMeta.url}/favicon.ico`,
  link: siteMeta.url,
  title: author.name,
})

for (const post of posts) {
  const url = `${siteMeta.url}/blog/${post.slug}`
  // const html = ReactDOMServer.renderToStaticMarkup(
  //   createElement(post.component, { isRssFeed: true })
  // )

  feed.addItem({
    author: [author],
    // content: html,
    contributor: [author],
    date: new Date(post.date),
    description: post.description,
    id: post.slug,
    link: url,
    title: post.title,
  })
}

await fs.mkdir("./public/rss", { recursive: true })
await Promise.all([
  fs.writeFile("./public/rss/feed.xml", feed.rss2(), "utf8"),
  fs.writeFile("./public/rss/feed.json", feed.json1(), "utf8"),
])
