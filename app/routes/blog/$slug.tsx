import { DataFunctionArgs } from "@remix-run/server-runtime"
import { MetaFunction, useLoaderData } from "remix"
import { MDXRenderer } from "~/components/MDXRenderer"
import PostLayout from "~/layouts/PostLayout"
import { PostFrontMatter } from "~/types/FrontMatter"
import { InferLoaderData } from "~/types/remix"
import { getFileBySlug } from "~/utils/mdx.server"
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
  // rss
  // const rss = generateRss(allPosts)
  // fs.writeFileSync("./public/feed.xml", rss)

  return {
    post: await getFileBySlug("blog", params.slug!),
  }
}

export default function Blog() {
  const { post } = useLoaderData<InferLoaderData<typeof loader>>()

  return (
    <MDXRenderer
      frontMatter={post.frontMatter}
      layout={PostLayout}
      source={post.source}
    />
  )
}
