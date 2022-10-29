import { Feed } from "feed"
import { mkdir, writeFile } from "fs/promises"
import ReactDOMServer from "react-dom/server"
import { getAllArticles } from "./getAllArticles"
import { siteMeta } from "./siteMeta"

export async function generateRssFeed() {
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
    const html = ReactDOMServer.renderToStaticMarkup(
      <article.component isRssFeed />
    )

    feed.addItem({
      author: [author],
      content: html,
      contributor: [author],
      date: new Date(article.date),
      description: article.description,
      id: url,
      link: url,
      title: article.title,
    })
  }

  await mkdir("./public/rss", { recursive: true })
  await Promise.all([
    writeFile("./public/rss/feed.xml", feed.rss2(), "utf8"),
    writeFile("./public/rss/feed.json", feed.json1(), "utf8"),
  ])
}
