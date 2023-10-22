import Image from "next/image"
import { PostLayout } from "components/layouts/PostLayout"
import { withOpenGraph } from "lib/metadata"
import { getAllPostSlugs, getPost } from "lib/posts"

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { description, title } = await getPost(params.slug)

  return withOpenGraph({
    description,
    openGraph: { url: `/blog/${params.slug}` },
    title,
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { component: Component, ...meta } = await getPost(params.slug)
  const image = await import(
    `../posts/${params.slug}/opengraph-image.png`
  ).catch(() => null)

  return (
    <PostLayout
      backHref="/blog"
      backText="Go back to posts"
      featuredImage={image ? <Image alt="Featured image" src={image} /> : null}
      meta={meta}
    >
      <Component />
    </PostLayout>
  )
}
