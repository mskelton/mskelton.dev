import Link from "next/link"
import { AnchorHTMLAttributes } from "react"

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function MarkdownLink({ href = "#", ...props }: LinkProps) {
  const isInternalLink = href.startsWith("/")
  const isAnchorLink = href.startsWith("#")

  return isInternalLink ? (
    <Link href={href} {...props} />
  ) : isAnchorLink ? (
    <a href={href} {...props} />
  ) : (
    <a href={href} rel="noopener noreferrer" {...props} />
  )
}
