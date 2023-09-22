import ZoomableImage from "../../app/components/ZoomableImage"

export interface MarkdownImageProps {
  alt?: string
  src?: string
}

export default async function MarkdownImage({ alt, src }: MarkdownImageProps) {
  const image = await import(`../../app/images/blog/${src}`)

  return (
    <span className="flex w-full flex-col items-center text-center">
      <ZoomableImage alt={alt ?? ""} src={image.default} />

      <span aria-hidden="true" className="text-muted mt-3 inline-block text-sm">
        {alt}
      </span>
    </span>
  )
}
