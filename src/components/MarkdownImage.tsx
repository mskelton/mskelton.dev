import Image from "next/image"

export interface MarkdownImageProps {
  src: string
  alt: string
}

export function MarkdownImage({ alt, src }: MarkdownImageProps) {
  return (
    <span className="inline-block text-center">
      <Image alt={alt} placeholder="blur" src={require(`../images/${src}`)} />
      <span className="text-sm text-gray-500 dark:text-gray-400">{alt}</span>
    </span>
  )
}
