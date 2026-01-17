import { PostLayout } from "components/layouts/PostLayout"
import { withOpenGraph } from "lib/metadata"
import { getAllPostSlugs, getPost } from "lib/posts"
import Image from "next/image"

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { description, title } = await getPost(slug)

  return withOpenGraph({
    description,
    openGraph: { url: `/blog/${slug}` },
    title,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { component: Component, ...meta } = await getPost(slug)
  const image = await import(`../posts/${slug}/opengraph-image.png`)
    .then((mod) => mod.default)
    .catch(() => null)

  return (
    <PostLayout
      backHref="/blog"
      backText="Go back to posts"
      featuredImage={
        image ? (
          <Image alt="Featured image" placeholder="blur" src={image} />
        ) : undefined
      }
      meta={meta}
    >
      <Component />
    </PostLayout>
  )
}
