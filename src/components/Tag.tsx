import Link from "next/link"
import slugify from "slugify"

interface TagProps {
  children: string
}

export default function Tag({ children }: TagProps) {
  return (
    <Link href={`/tags/${slugify(children)}`}>
      <a className="link mr-3 text-sm font-medium">#{children}</a>
    </Link>
  )
}
