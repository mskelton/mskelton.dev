import { PostLayout } from "~/components/layouts/PostLayout"
import { toDateString } from "~/lib/date"
import { withOpenGraph } from "~/lib/metadata"
import { siteMeta } from "~/lib/siteMeta"
import { getByte } from "../api"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { description, id, title } = await getByte(slug)

  return withOpenGraph({
    alternates: {
      canonical: `${siteMeta.url}/bytes/${id}`,
    },
    description,
    openGraph: {
      url: `${siteMeta.url}/bytes/${id}`,
    },
    title,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { content, created_at, description, title } = await getByte(slug)
  const date = toDateString(created_at)

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
