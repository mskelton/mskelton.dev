import { Feed } from "feed"
import { cache } from "react"
import { getAllPosts } from "lib/posts"
import { siteMeta } from "lib/siteMeta"

// Revalidate the data at most every hour
export const revalidate = 3600

export const getFeed = cache(async () => {
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

  return feed
})
