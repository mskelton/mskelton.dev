import clsx from "clsx"
import Link from "next/link"
import { LinkProps } from "next/link"

export interface NavItemProps extends LinkProps {
  children: React.ReactNode
  isActive?: boolean
}

export function NavItem({ children, isActive, ...props }: NavItemProps) {
  return (
    <li>
      <Link
        aria-current={isActive ? "page" : undefined}
        className={clsx(
          "focusable relative flex gap-1 rounded px-4 py-1 text-zinc-800 transition-colors hover:text-black dark:text-zinc-200 dark:hover:text-white",
          "after:absolute after:bottom-0.5 after:left-1/2 after:h-0.5 after:w-0 after:rounded-sm after:bg-indigo-500 after:transition-all aria-current:after:left-3.5 aria-current:after:right-3 aria-current:after:w-[calc(100%-32px)] dark:after:bg-indigo-400",
        )}
        {...props}
      >
        <span className="z-10">{children}</span>
      </Link>
    </li>
  )
}
