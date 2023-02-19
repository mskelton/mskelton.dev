import Image from "next/image"

export interface MarkdownImageProps {
  alt?: string
  src?: string
}

export async function MarkdownImage({ alt, src }: MarkdownImageProps) {
  const image = await import(`../../images/${src}`)

  return (
    <span className="inline-block text-center">
      <Image alt={alt ?? ""} placeholder="blur" src={image.default} />
      <span className="text-muted inline-block text-sm">{alt}</span>
    </span>
  )
}
