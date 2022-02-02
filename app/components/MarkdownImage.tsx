export interface MarkdownImageProps {
  alt?: string
  src?: string
}

export function MarkdownImage({ alt, src }: MarkdownImageProps) {
  return (
    <span className="inline-block text-center">
      {/* <img alt={alt} placeholder="blur" src={require(`../images/${src}`)} /> */}
      <span className="text-muted inline-block text-sm">{alt}</span>
    </span>
  )
}
