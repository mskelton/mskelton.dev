import NextLink from "next/link"
import { FaCalendar, FaClock } from "react-icons/fa"
import { BlogPostMeta } from "lib/posts"
import { formatDate } from "utils/date"
import { Link } from "../Link"
import { CardFooterItem } from "./CardFooterItem"

export function BlogPostCard({
  date,
  excerpt,
  slug,
  time,
  title,
}: BlogPostCardProps) {
  return (
    <article className="bg-gray-900 h-52 rounded-lg min">
      <div className="flex flex-col justify-between h-full p-5">
        <div>
          <NextLink href={`/blog/${encodeURIComponent(slug)}`}>
            <Link>
              <h2 className="font-semibold mb-2">{title}</h2>
            </Link>
          </NextLink>

          <p className="text-gray-400 leading-6 mb-7">{excerpt}</p>
        </div>

        <div className="flex items-center justify-between">
          <CardFooterItem icon={<FaCalendar />}>
            {formatDate(date)}
          </CardFooterItem>

          <CardFooterItem icon={<FaClock />}>{time} minute read</CardFooterItem>
        </div>
      </div>
    </article>
  )
}

export type BlogPostCardProps = Pick<
  BlogPostMeta,
  "slug" | "title" | "date" | "excerpt" | "time"
>
