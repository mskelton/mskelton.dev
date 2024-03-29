import { isExternalImage } from "lib/image"
import ZoomableImage from "../../app/components/ZoomableImage"

export interface MarkdownImageProps {
  alt?: string
  src?: string
}

export default async function MarkdownImage({
  alt: altProp = "",
  src,
}: MarkdownImageProps) {
  const isAltHidden = altProp?.startsWith("!")
  const alt = isAltHidden ? altProp.slice(1) : altProp

  const image = isExternalImage(src)
    ? { default: src }
    : await import(`../../app/(main)/blog/posts/${src}`)

  return (
    <span className="flex w-full flex-col items-center text-center">
      <ZoomableImage alt={alt} src={image.default} />

      {isAltHidden ? null : (
        <span
          aria-hidden="true"
          className="text-muted mt-3 inline-block text-sm"
        >
          {alt}
        </span>
      )}
    </span>
  )
}
