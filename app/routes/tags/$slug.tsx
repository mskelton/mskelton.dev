import { DataFunctionArgs } from "@remix-run/server-runtime"
import { MetaFunction, useLoaderData } from "remix"
import slugify from "slugify"
import ListLayout from "~/layouts/ListLayout"
import { InferLoaderData } from "~/types/remix"
import { getAllFilesFrontMatter } from "~/utils/mdx.server"
import { seo } from "~/utils/seo"

export const meta: MetaFunction = ({ data }) => {
  return seo({
    description: `What I've wrote about ${data.tag}`,
    title: data.tag,
  })
}

export async function loader({ params }: DataFunctionArgs) {
  const allPosts = await getAllFilesFrontMatter()
  const filteredPosts = allPosts.filter((post) =>
    post.tags.map((t) => slugify(t)).includes(params.slug!)
  )

  // rss
  // const rss = generateRss(filteredPosts, `tags/${params.slug}/feed.xml`)
  // const rssPath = path.join(root, "public", "tags", params.slug)
  // fs.mkdirSync(rssPath, { recursive: true })
  // fs.writeFileSync(path.join(rssPath, "feed.xml"), rss)

  return { posts: filteredPosts, tag: params.slug! }
}

export default function Tag() {
  const data = useLoaderData<InferLoaderData<typeof loader>>()

  return <ListLayout posts={data.posts} title={`#${data.tag}`} />
}
