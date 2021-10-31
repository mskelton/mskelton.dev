import { PageSEO } from "components/SEO"
import metadata from "data/metadata"
import ListLayout from "layouts/ListLayout"
import { getAllFilesFrontMatter } from "lib/mdx"

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter()
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, pagination, posts } }
}

export default function Blog({ initialDisplayPosts, pagination, posts }) {
  return (
    <>
      <PageSEO
        description={metadata.description}
        title={`Blog - ${metadata.author}`}
      />
      <ListLayout
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        posts={posts}
        title="All Posts"
      />
    </>
  )
}
