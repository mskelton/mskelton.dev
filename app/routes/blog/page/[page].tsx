import { LoaderFunction } from "remix"
import { getAllFilesFrontMatter } from "~/utils/mdx.server"
import { PageSEO } from "../../../components/SEO"
import metadata from "../../../data/metadata"
import ListLayout from "../../../layouts/ListLayout"
import { POSTS_PER_PAGE } from "../../blog"

export const loader: LoaderFunction = async () => {
  const page = parseInt(context.params!.page)
  const posts = await getAllFilesFrontMatter()
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (page - 1),
    POSTS_PER_PAGE * page
  )

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, pagination, posts } }
}

export default function PostPage() {
  return (
    <>
      <PageSEO description={metadata.description} title={metadata.title} />

      <ListLayout
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        posts={posts}
        title="All Posts"
      />
    </>
  )
}
