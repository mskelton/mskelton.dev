import React from "react"
import { Link } from "~/components/Link"

export interface PaginationLinkProps {
  children: React.ReactNode
  disabled: boolean
  href: string
  rel: string
}

export function PaginationLink({
  children,
  disabled,
  href,
  rel,
}: PaginationLinkProps) {
  return disabled ? (
    <button className="cursor-auto disabled:opacity-50" disabled>
      {children}
    </button>
  ) : (
    <Link className="link-primary" href={href} rel={rel}>
      {children}
    </Link>
  )
}
