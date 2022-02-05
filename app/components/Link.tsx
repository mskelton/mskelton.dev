import { AnchorHTMLAttributes } from "react"
import { Link as RemixLink } from "remix"

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export function Link({ href = "#", ...rest }: LinkProps) {
  const isExternalLink = /^https?:/.test(href)
  const isAnchorLink = href.startsWith("#")

  return isExternalLink ? (
    <a href={href} rel="noopener noreferrer" target="_blank" {...rest} />
  ) : isAnchorLink ? (
    <a href={href} {...rest} />
  ) : (
    <RemixLink to={href} {...rest} />
  )
}
