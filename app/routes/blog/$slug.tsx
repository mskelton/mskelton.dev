import { DataFunctionArgs } from "@remix-run/server-runtime"
import { MetaFunction, useLoaderData } from "remix"
import { MDXRenderer } from "~/components/MDXRenderer"
import PostLayout from "~/layouts/PostLayout"
import { PostFrontMatter } from "~/types/FrontMatter"
import { InferLoaderData } from "~/types/remix"
import { getAllFilesFrontMatter, getFileBySlug } from "~/utils/mdx.server"
import { seo } from "~/utils/seo"

export const meta: MetaFunction = ({ data }) => {
  const post = data.post.frontMatter as PostFrontMatter
  const publishedAt = new Date(post.date).toISOString()

  return seo({
    "article:published_time": publishedAt,
    description: post.summary,
    "og:type": "article",
    title: post.title,
  })
}

export async function loader({ params }: DataFunctionArgs) {
  const slug = params.slug!
  const allPosts = await getAllFilesFrontMatter()
  const postIndex = allPosts.findIndex((post) => post.slug === slug)

  // rss
  // const rss = generateRss(allPosts)
  // fs.writeFileSync("./public/feed.xml", rss)

  return {
    next: allPosts[postIndex - 1] || null,
    post: await getFileBySlug("blog", slug),
    prev: allPosts[postIndex + 1] || null,
  }
}

export default function Blog() {
  const { next, post, prev } = useLoaderData<InferLoaderData<typeof loader>>()

  return (
    <MDXRenderer
      frontMatter={post.frontMatter}
      layout={PostLayout}
      next={next}
      prev={prev}
      source={post.source}
    />
  )
}
