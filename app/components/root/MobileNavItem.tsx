import { Popover } from "@headlessui/react"
import { Route } from "next"
import Link from "next/link"

export interface MobileNavItem {
  children: React.ReactNode
  href: Route
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
