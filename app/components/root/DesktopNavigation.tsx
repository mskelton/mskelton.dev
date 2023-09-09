"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { NavItem } from "./NavItem"
import { navItems } from "./navItems"

export function DesktopNavigation(props: React.HTMLAttributes<HTMLElement>) {
  const [local, setLocal] = useState<string>()
  const pathname = usePathname()
  const active = local ?? pathname

  // Sync the active path when the navigation finishes
  useEffect(() => {
    setLocal(pathname)
  }, [pathname])

  return (
    <nav {...props}>
      <ul className="flex gap-1 rounded-full text-sm font-medium text-zinc-800 transition-colors dark:text-zinc-200">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            isActive={item.href === active}
            onClick={() => setLocal(item.href)}
          >
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}
