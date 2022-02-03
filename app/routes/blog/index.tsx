import { useLoaderData } from "remix"
import { PageSEO } from "~/components/SEO"
import metadata from "~/data/metadata"
import ListLayout from "~/layouts/ListLayout"
import { InferLoaderData } from "~/types/remix"
import { getAllFilesFrontMatter } from "~/utils/mdx.server"

export const POSTS_PER_PAGE = 5

export const loader = async () => {
  const posts = await getAllFilesFrontMatter()
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { initialDisplayPosts, pagination, posts }
}

export default function Blog() {
  const data = useLoaderData<InferLoaderData<typeof loader>>()

  return (
    <>
      <PageSEO
        description={metadata.description}
        title={`Blog - ${metadata.author}`}
      />

      <div data-testid="blog">
        <ListLayout title="All Posts" {...data} />
      </div>
    </>
  )
}
