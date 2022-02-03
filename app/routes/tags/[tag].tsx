import { LoaderFunction } from "remix"
import slugify from "slugify"
import { TagSEO } from "~/components/SEO"
import metadata from "~/data/metadata"
import ListLayout from "~/layouts/ListLayout"
import { getStaticPaths } from "~/blog/[slug]"
import { getAllFilesFrontMatter } from "~/utils/mdx.server"
import { InferGetStaticPropsType } from "next"

export const loader: LoaderFunction = async () => {
  const allPosts = await getAllFilesFrontMatter()
  const filteredPosts = allPosts.filter((post) =>
    post.tags.map((t) => slugify(t)).includes(params!.tag)
  )

  // rss
  // const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
  // const rssPath = path.join(root, "public", "tags", params.tag)
  // fs.mkdirSync(rssPath, { recursive: true })
  // fs.writeFileSync(path.join(rssPath, "feed.xml"), rss)

  return {
    props: {
      posts: filteredPosts,
      tag: params!.tag,
    },
  }
}

export default function Tag({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticPaths>) {
  return (
    <>
      <TagSEO
        description={`${tag} tags - ${metadata.author}`}
        title={`${tag} - ${metadata.author}`}
      />
      <ListLayout posts={posts} title={`#${tag}`} />
    </>
  )
}
