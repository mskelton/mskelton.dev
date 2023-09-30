import clsx from "clsx"
import { cloneElement } from "react"

export interface DemoToolbarButtonProps {
  children: React.ReactElement
  href?: string
  onClick?: () => void
  title: string
}

export default function DemoToolbarButton({
  children,
  href,
  onClick,
}: DemoToolbarButtonProps) {
  const Component = href ? "a" : "button"

  return (
    <Component
      className="rounded-full p-2 transition-[background-color] hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:bg-indigo-100 dark:hover:bg-zinc-800 dark:active:bg-indigo-900"
      href={href}
      onClick={onClick}
      rel={href ? "noopener noreferrer" : undefined}
      target={href ? "_blank" : undefined}
      type={href ? undefined : "button"}
    >
      {cloneElement(children, {
        className: clsx("w-5 h-5", children.props.className),
      })}
    </Component>
  )
}
