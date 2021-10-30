import Link from "next/link"
import slugify from "slugify"

interface TagProps {
  children: string
}

export default function Tag({ children }: TagProps) {
  return (
    <Link href={`/tags/${slugify(children)}`}>
      <a className="mr-3 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        #{children}
      </a>
    </Link>
  )
}
