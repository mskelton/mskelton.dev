import Link from "next/link"
import { FaCalendar, FaClock } from "react-icons/fa"
import { LinkOverlay } from "components/LinkOverlay"
import { BlogPostMeta } from "lib/posts"
import { formatDate } from "utils/date"
import { CardFooterItem } from "./CardFooterItem"

export type BlogPostCardProps = BlogPostMeta

export function BlogPostCard({
  date,
  excerpt,
  readingTime,
  slug,
  title,
}: BlogPostCardProps) {
  return (
    <article className="bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 min-h-52 rounded-lg relative">
      <div className="flex flex-col justify-between h-full p-5">
        <div>
          <Link href={`/blog/${encodeURIComponent(slug)}`} passHref>
            <LinkOverlay>
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
            </LinkOverlay>
          </Link>

          <p className="text-gray-400 leading-6 mb-7">{excerpt}</p>
        </div>

        <div className="flex items-center justify-between">
          <CardFooterItem icon={<FaCalendar />}>
            {formatDate(date)}
          </CardFooterItem>

          <CardFooterItem icon={<FaClock />}>{readingTime}</CardFooterItem>
        </div>
      </div>
    </article>
  )
}
