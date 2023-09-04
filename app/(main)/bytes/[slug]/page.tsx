import { ArticleLayout } from "components/layouts/ArticleLayout"
import { getByte } from "../api"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { meta } = await getByte(params.slug)

  return {
    title: `${meta.title} - Mark Skelton`,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { content, meta } = await getByte(params.slug)

  return (
    <ArticleLayout backHref="/bytes" backText="Go back to bytes" meta={meta}>
      {content}
    </ArticleLayout>
  )
}
