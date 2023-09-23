import Link from "next/link"
import { Button } from "components/Button"

export interface PageLinkProps {
  children: React.ReactNode
  href: string | undefined
}

export default function PageLink({ href, ...props }: PageLinkProps) {
  const isDisabled = href === undefined

  return (
    <Button
      as={isDisabled ? undefined : Link}
      href={href}
      isDisabled={isDisabled}
      variant="secondary"
      {...props}
    />
  )
}
