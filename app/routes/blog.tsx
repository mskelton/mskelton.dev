import { LoaderFunction } from "remix"
import { getAllFilesFrontMatter } from "~/utils/mdx.server"
import { PageSEO } from "../components/SEO"
import metadata from "../data/metadata"
import ListLayout from "../layouts/ListLayout"

export const POSTS_PER_PAGE = 5

export const loader: LoaderFunction = async () => {
  const posts = await getAllFilesFrontMatter()
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, pagination, posts } }
}

export default function Blog() {
  return (
    <>
      <PageSEO
        description={metadata.description}
        title={`Blog - ${metadata.author}`}
      />

      <div data-testid="blog">
        <ListLayout
          initialDisplayPosts={initialDisplayPosts}
          pagination={pagination}
          posts={posts}
          title="All Posts"
        />
      </div>
    </>
  )
}
