import Image from "next/image"

export interface MarkdownImageProps {
  alt?: string
  src?: string
}

export async function MarkdownImage({ alt, src }: MarkdownImageProps) {
  const image = await import(`../../app/images/blog/${src}`)

  return (
    <span className="inline-flex w-full flex-col items-center text-center">
      <Image alt={alt ?? ""} placeholder="blur" src={image.default} />
      <span aria-hidden="true" className="text-muted mt-3 inline-block text-sm">
        {alt}
      </span>
    </span>
  )
}
