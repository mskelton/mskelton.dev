"use client"

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
        className="relative flex gap-1 py-1 px-4 text-zinc-800 transition-colors hover:text-indigo-600 dark:text-zinc-200 dark:hover:text-indigo-400"
        href={href}
      >
        {children}
      </Link>
    </li>
  )
}
