"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export interface NavItemProps {
  children: React.ReactNode
  href: string
}

export function NavItem({ children, href }: NavItemProps) {
  const isActive = usePathname()?.startsWith(href)

  return (
    <li>
      <Link
        className={clsx(
          "relative block rounded-full py-1 px-4 transition-colors",
          isActive
            ? "bg-teal-200 dark:bg-teal-800"
            : "hover:text-teal-500 dark:hover:text-teal-400"
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  )
}
