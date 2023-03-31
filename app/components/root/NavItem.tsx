"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export interface NavItemProps {
  children: React.ReactNode
  href: string
}

export function NavItem({ children, href }: NavItemProps) {
  const [isActive, setIsActive] = useState(false)
  const pathname = usePathname()

  // Because the header is a different component between home and other pages,
  // we have to set the active state after the initial render to ensure the
  // underline transition is applied.
  useEffect(() => {
    setIsActive(pathname?.startsWith(href))
  }, [pathname, href])

  return (
    <li>
      <Link
        aria-current={isActive ? "page" : undefined}
        className={clsx(
          "relative flex gap-1 px-4 py-1 text-zinc-800 transition-colors hover:text-black dark:text-zinc-200 dark:hover:text-white",
          "after:absolute after:bottom-0.5 after:left-1/2 after:h-0.5 after:w-0 after:rounded-sm after:bg-indigo-500 after:transition-all aria-current:after:left-3.5 aria-current:after:right-3 aria-current:after:w-[calc(100%-32px)] dark:after:bg-indigo-400"
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  )
}
