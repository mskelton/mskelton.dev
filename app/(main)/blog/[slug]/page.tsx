import { PostLayout } from "components/layouts/PostLayout"
import { getPost } from "../api"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { title } = await getPost(params.slug)

  return {
    title: `${title} | Mark Skelton`,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { Component, ...meta } = await getPost(params.slug)

  return (
    <PostLayout backHref="/blog" backText="Go back to posts" meta={meta}>
      <Component />
    </PostLayout>
  )
}
