import { DataFunctionArgs } from "@remix-run/server-runtime"
import { useLoaderData } from "remix"
import slugify from "slugify"
import { TagSEO } from "~/components/SEO"
import metadata from "~/data/metadata"
import ListLayout from "~/layouts/ListLayout"
import { InferLoaderData } from "~/types/remix"
import { getAllFilesFrontMatter } from "~/utils/mdx.server"

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
  const { posts, tag } = useLoaderData<InferLoaderData<typeof loader>>()

  return (
    <>
      <TagSEO
        description={`${tag} tags - ${metadata.title}`}
        title={`${tag} - ${metadata.title}`}
      />

      <ListLayout posts={posts} title={`#${tag}`} />
    </>
  )
}
