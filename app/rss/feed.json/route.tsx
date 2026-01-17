import { getFeed } from "~/rss/utils"

export const dynamic = "force-dynamic"

export async function GET() {
  const feed = await getFeed()
  const content = feed.json1()

  return new Response(content, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
