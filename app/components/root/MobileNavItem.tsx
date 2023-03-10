import { Popover } from "@headlessui/react"
import Link from "next/link"

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
