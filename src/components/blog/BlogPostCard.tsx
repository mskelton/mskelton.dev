import Link from "next/link"
import React from "react"
import { BlogPost } from "../../lib/posts"

export function BlogPostCard({ excerpt, slug, title }: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow p-4">
      <Link href={`/blog/${encodeURIComponent(slug)}`}>
        <a>
          <h2>{title}</h2>
        </a>
      </Link>
      <p>{excerpt}</p>
    </article>
  )
}

export type BlogPostCardProps = Pick<
  BlogPost,
  "slug" | "title" | "date" | "excerpt"
>
