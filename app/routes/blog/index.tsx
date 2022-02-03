import { DataFunctionArgs } from "@remix-run/server-runtime"
import { useLoaderData } from "remix"
import { PageSEO } from "~/components/SEO"
import metadata from "~/data/metadata"
import ListLayout from "~/layouts/ListLayout"
import { InferLoaderData } from "~/types/remix"
import { getAllFilesFrontMatter } from "~/utils/mdx.server"

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
    <>
      <PageSEO
        description={metadata.description}
        title={`Blog - ${metadata.title}`}
      />

      <div data-testid="blog">
        <ListLayout title="All Posts" {...data} />
      </div>
    </>
  )
}
