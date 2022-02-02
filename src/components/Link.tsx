import { AnchorHTMLAttributes } from "react"
import { Link as RemixLink } from "remix"

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export function Link({ href = "#", ...rest }: LinkProps) {
  const isInternalLink = href.startsWith("/")
  const isAnchorLink = href.startsWith("#")

  return isInternalLink ? (
    <RemixLink to={href} {...rest} />
  ) : isAnchorLink ? (
    <a href={href} {...rest} />
  ) : (
    <a href={href} rel="noopener noreferrer" target="_blank" {...rest} />
  )
}
