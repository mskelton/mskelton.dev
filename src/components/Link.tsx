import NextLink from "next/link"
import { AnchorHTMLAttributes } from "react"
import { Anchor } from "./Anchor"

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function Link({ href, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <Anchor {...props} />
    </NextLink>
  )
}
