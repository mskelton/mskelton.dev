import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import slugify from "slugify"
import { TagSEO } from "components/SEO"
import ListLayout from "layouts/ListLayout"
import { getAllFilesFrontMatter } from "lib/mdx"
import { getAllTags } from "lib/tags"

export async function getStaticPaths() {
  const tags = await getAllTags()

  return {
    fallback: false,
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ tag: string }>) {
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
        description={`${tag} tags - Mark Skelton`}
        title={`${tag} - Mark Skelton`}
      />
      <ListLayout posts={posts} title={`#${tag}`} />
    </>
  )
}
