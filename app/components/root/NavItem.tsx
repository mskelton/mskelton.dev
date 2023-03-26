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
        className={clsx(
          "relative flex gap-1 py-1 px-4 text-zinc-700 transition-colors hover:text-black dark:text-zinc-300 dark:hover:text-white",
          "after:absolute after:bottom-0.5 after:left-1/2 after:h-0.5 after:w-0 after:rounded-sm after:bg-indigo-500 after:transition-all aria-current:after:left-3.5 aria-current:after:right-3 aria-current:after:w-[calc(100%-32px)] dark:after:bg-indigo-400"
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  )
}
