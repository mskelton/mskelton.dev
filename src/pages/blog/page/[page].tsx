import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { PageSEO } from "~/components/SEO"
import metadata from "~/data/metadata"
import ListLayout from "layouts/ListLayout"
import { getAllFilesFrontMatter } from "~/lib/mdx"
import { POSTS_PER_PAGE } from "../../blog"

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter()
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return { fallback: false, paths }
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ page: string }>
) {
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

export default function PostPage({
  initialDisplayPosts,
  pagination,
  posts,
}: InferGetStaticPropsType<typeof getStaticPaths>) {
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
