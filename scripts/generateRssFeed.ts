import glob from "fast-glob"
import { Feed } from "feed"
import matter from "gray-matter"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "url"
import { ArticleMeta } from "../app/components/layouts/ArticleLayout.js"
import { siteMeta } from "../app/lib/siteMeta.js"

const baseURL = new URL("../app/(header)/blog/", import.meta.url)

async function readFrontmatter(filename: string) {
  const content = await fs.readFile(new URL(filename, baseURL), "utf8")
  const frontmatter = matter(content)

  return {
    ...(frontmatter.data as ArticleMeta),
    slug: path.dirname(filename),
  }
}

async function getAllArticles() {
  const cwd = fileURLToPath(baseURL)
  const filenames = await glob("**/*.mdx", { cwd })
  const articles = await Promise.all(filenames.map(readFrontmatter))

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  )
}

const articles = await getAllArticles()
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

for (const article of articles) {
  const url = `${siteMeta.url}/blog/${article.slug}`
  // const html = ReactDOMServer.renderToStaticMarkup(
  //   createElement(article.component, { isRssFeed: true })
  // )

  feed.addItem({
    author: [author],
    // content: html,
    contributor: [author],
    date: new Date(article.date),
    description: article.description,
    id: article.slug,
    link: url,
    title: article.title,
  })
}

await fs.mkdir("./public/rss", { recursive: true })
await Promise.all([
  fs.writeFile("./public/rss/feed.xml", feed.rss2(), "utf8"),
  fs.writeFile("./public/rss/feed.json", feed.json1(), "utf8"),
])
