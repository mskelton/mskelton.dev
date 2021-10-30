import { PageSEO } from "components/SEO"
import siteMetadata from "data/siteMetadata"
import ListLayout from "layouts/ListLayout"
import { getAllFilesFrontMatter } from "lib/mdx"
import { POSTS_PER_PAGE } from "../../blog"

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter("blog")
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    fallback: false,
    paths,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context
  const posts = await getAllFilesFrontMatter("blog")
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      initialDisplayPosts,
      pagination,
      posts,
    },
  }
}

export default function PostPage({ initialDisplayPosts, pagination, posts }) {
  return (
    <>
      <PageSEO
        description={siteMetadata.description}
        title={siteMetadata.title}
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
