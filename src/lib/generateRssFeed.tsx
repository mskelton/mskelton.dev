import { Feed } from "feed"
import { mkdir, writeFile } from "fs/promises"
import ReactDOMServer from "react-dom/server"
import { getAllArticles } from "./getAllArticles"

export async function generateRssFeed() {
  const articles = await getAllArticles()
  const author = { email: "info@mskelton.dev", name: "Mark Skelton" }

  const feed = new Feed({
    author,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    description: "Your blog description",
    favicon: "https://mskelton.dev/favicon.ico",
    feedLinks: {
      json: "https://mskelton.dev/rss/feed.json",
      rss2: "https://mskelton.dev/rss/feed.xml",
    },
    id: "https://mskelton.dev",
    image: "https://mskelton.dev/favicon.ico",
    link: "https://mskelton.dev",
    title: author.name,
  })

  for (const article of articles) {
    const url = `https://mskelton.dev/blog/${article.slug}`
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
