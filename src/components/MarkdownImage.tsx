import Image from "next/image"

export interface MarkdownImageProps {
  src: string
  alt: string
}

export function MarkdownImage({ alt, src }: MarkdownImageProps) {
  return (
    <div className="text-center my-9">
      <Image alt={alt} placeholder="blur" src={require(`../img/${src}`)} />
      <p className="text-sm text-gray-400">{alt}</p>
    </div>
  )
}
