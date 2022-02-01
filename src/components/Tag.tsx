import slugify from "slugify"
import { Link } from "./Link"

interface TagProps {
  children: string
}

export default function Tag({ children }: TagProps) {
  return (
    <Link
      className="link-primary text-sm font-medium"
      href={`/tags/${slugify(children)}`}
    >
      #{children}
    </Link>
  )
}
