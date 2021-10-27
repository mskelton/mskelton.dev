import Link from "next/link"
import { Anchor } from "components/Anchor"

export interface MarkdownLinkProps {
  children?: string
  href: string
}

export function MarkdownLink({ children, href }: MarkdownLinkProps) {
  return (
    <Link href={href} passHref>
      <Anchor>{children}</Anchor>
    </Link>
  )
}
