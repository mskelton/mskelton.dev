import { getPostImage } from "lib/posts"

interface PageParams {
  params: {
    slug: string
  }
}

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

export default async function Image({ params }: PageParams) {
  const bytes = await getPostImage(params.slug)
  const blob = new Blob([bytes], { type: "image/png" })

  return new Response(blob)
}
