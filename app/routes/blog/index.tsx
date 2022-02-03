import { DataFunctionArgs } from "@remix-run/server-runtime"
import { MetaFunction, useLoaderData } from "remix"
import ListLayout from "~/layouts/ListLayout"
import { InferLoaderData } from "~/types/remix"
import { getAllFilesFrontMatter } from "~/utils/mdx.server"
import { seo } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return seo({
    description: `Check out my recent articles or if you're feeling adventurous, dig back in the archives.`,
    title: "Blog",
  })
}

const POSTS_PER_PAGE = 5

export async function loader({ request }: DataFunctionArgs) {
  const posts = await getAllFilesFrontMatter()

  const url = new URL(request.url)
  const page = +(url.searchParams.get("page") ?? 1)
  const start = (page - 1) * POSTS_PER_PAGE

  return {
    initialDisplayPosts: posts.slice(start, start + POSTS_PER_PAGE),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    },
    posts,
  }
}

export default function Blog() {
  const data = useLoaderData<InferLoaderData<typeof loader>>()

  return (
    <div data-testid="blog">
      <ListLayout title="All Posts" {...data} />
    </div>
  )
}
