import { Feed } from "feed"
import { cache } from "react"
import { getAllBytes } from "~/(main)/bytes/api"
import { parseDate } from "~/lib/date"
import { getAllPosts } from "~/lib/posts"
import { siteMeta } from "~/lib/siteMeta"

const author = {
  email: siteMeta.email,
  name: "Mark Skelton",
}

// Revalidate the data at most every hour
export const revalidate = 3600

export const getFeed = cache(async () => {
  const posts = await getAllPosts()
  const bytes = await getAllBytes()

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

  feed.addCategory("Blog")
  feed.addCategory("Bytes")

  const items = [
    ...posts.map((post) => ({
      ...post,
      category: "Blog",
      date: parseDate(post.date),
      url: `${siteMeta.url}/blog/${post.slug}`,
    })),
    ...bytes.map((byte) => ({
      ...byte,
      category: "Bytes",
      date: byte.created_at,
      url: `${siteMeta.url}/bytes/${byte.id}`,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime())

  for (const item of items) {
    feed.addItem({
      author: [author],
      category: [{ name: item.category }],
      contributor: [author],
      date: new Date(item.date),
      description: item.description,
      id: item.slug,
      link: item.url,
      published: new Date(item.date),
      title: item.title,
    })
  }

  return feed
})
