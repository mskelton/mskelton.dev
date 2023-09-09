import { ArticleLayout } from "components/layouts/ArticleLayout"
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
    <ArticleLayout backHref="/blog" backText="Go back to posts" meta={meta}>
      <Component />
    </ArticleLayout>
  )
}
