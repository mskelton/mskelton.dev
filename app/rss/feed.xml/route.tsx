import { getFeed } from "rss/utils"

export async function GET() {
  const feed = await getFeed()
  const content = feed.rss2()

  return new Response(content, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  })
}
