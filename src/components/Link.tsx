/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link"
import { AnchorHTMLAttributes } from "react"

export interface CustomLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export default function CustomLink({ href, ...rest }: CustomLinkProps) {
  const isInternalLink = href.startsWith("/")
  const isAnchorLink = href.startsWith("#")

  return isInternalLink ? (
    <Link href={href}>
      <a {...rest} />
    </Link>
  ) : isAnchorLink ? (
    <a href={href} {...rest} />
  ) : (
    <a href={href} rel="noopener noreferrer" target="_blank" {...rest} />
  )
}
