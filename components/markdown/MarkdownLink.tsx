import Link from "next/link"
import { AnchorHTMLAttributes } from "react"
import { siteMeta } from "lib/siteMeta"

function normalizeHref(href: string) {
  return href.startsWith(siteMeta.url) ? href.replace(siteMeta.url, "") : href
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function MarkdownLink({ href = "#", ...props }: LinkProps) {
  href = normalizeHref(href)
  const isInternalLink = href.startsWith("/")
  const isAnchorLink = href.startsWith("#")

  return isInternalLink ? (
    <Link href={href} {...props} />
  ) : isAnchorLink ? (
    <a href={href} {...props} />
  ) : (
    <a href={href} rel="noopener noreferrer" target="_blank" {...props} />
  )
}
