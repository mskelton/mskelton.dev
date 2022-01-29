import React from "react"
import { CustomLink as Link } from "./Link"

export interface PostPaginationLinkProps {
  children?: React.ReactNode
  link?: {
    slug: string
    title: string
  }
}

export function PostPaginationLink({
  children,
  link,
}: PostPaginationLinkProps) {
  return link ? (
    <div>
      <h2 className="text-muted text-xs uppercase">{children}</h2>

      <Link className="link" href={`/blog/${link.slug}`}>
        {link.title}
      </Link>
    </div>
  ) : null
}
