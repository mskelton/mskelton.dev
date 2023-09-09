import { PostLayout } from "components/layouts/PostLayout"
import { toDateString } from "lib/date"
import { getByte } from "../api"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { title } = await getByte(params.slug)

  return {
    title: `${title} | Mark Skelton`,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { content, createdAt, description, title } = await getByte(params.slug)
  const date = toDateString(createdAt)

  return (
    <PostLayout
      backHref="/bytes"
      backText="Go back to bytes"
      meta={{ date, description, title }}
    >
      {content}
    </PostLayout>
  )
}
