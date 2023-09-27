import { PostLayout } from "components/layouts/PostLayout"
import { toDateString } from "lib/date"
import { withOpenGraph } from "lib/metadata"
import { getByte } from "../api"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { description, id, title } = await getByte(params.slug)

  return withOpenGraph({
    description,
    openGraph: {
      images: ["/logo.jpg"],
      url: `/bytes/${id}`,
    },
    title,
    twitter: {
      card: "summary",
      images: ["/logo.jpg"],
    },
  })
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
