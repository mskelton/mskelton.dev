import { CalendarIcon, ClockIcon } from "@heroicons/react/solid"
import Link from "next/link"
import React from "react"
import { BlogPost } from "../../lib/posts"
import { formatDate } from "../../utils/date"
import { CardFooterItem } from "./CardFooterItem"

export function BlogPostCard({
  date,
  excerpt,
  slug,
  title,
}: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow">
      <img alt={title} src="" />

      <div className="p-5">
        <Link href={`/blog/${encodeURIComponent(slug)}`}>
          <a>
            <h2 className="font-semibold mb-2">{title}</h2>
          </a>
        </Link>

        <p className="text-gray-600 font-light mb-7">{excerpt}</p>
        <div className="flex items-center justify-between">
          <CardFooterItem icon={<CalendarIcon />}>
            {formatDate(date)}
          </CardFooterItem>

          <CardFooterItem icon={<ClockIcon />}>3 minute read</CardFooterItem>
        </div>
      </div>
    </article>
  )
}

export type BlogPostCardProps = Pick<
  BlogPost,
  "slug" | "title" | "date" | "excerpt"
>
