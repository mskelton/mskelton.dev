import { Popover } from "@headlessui/react"
import NextLink, { LinkProps } from "next/link"

const Link = NextLink as (props: LinkProps<string>) => React.ReactElement

export interface MobileNavItem {
  children: React.ReactNode
  href: string
}

export function MobileNavItem({ children, href }: MobileNavItem) {
  return (
    <li>
      <Popover.Button as={Link} className="block py-2" href={href}>
        {children}
      </Popover.Button>
    </li>
  )
}
