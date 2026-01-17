import { getPostImage } from "~/lib/posts"

const size = {
  height: 1024,
  width: 1024,
}

export function generateImageMetadata() {
  return [
    {
      contentType: "image/png",
      id: "featured",
      size,
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const bytes = await getPostImage(slug)

  if (bytes instanceof ArrayBuffer) {
    const blob = new Blob([bytes], { type: "image/png" })
    return new Response(blob)
  }

  throw new Error(`Expected ArrayBuffer but got ${typeof bytes}`)
}
