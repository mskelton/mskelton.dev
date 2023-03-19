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
        aria-current={isActive ? "page" : undefined}
        className="relative flex gap-1 py-1 px-4 transition-colors hover:text-indigo-600 aria-current:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-400"
        href={href}
      >
        {children}
      </Link>
    </li>
  )
}
