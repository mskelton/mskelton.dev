import { clsx } from "clsx"
import Link from "next/link"

const variantStyles = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-100 hover:text-indigo-600 font-medium text-zinc-900 hover:bg-zinc-200 active:bg-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/60 dark:hover:text-indigo-400 dark:active:bg-zinc-800/80",
}

export interface ButtonProps
  extends
    React.HTMLAttributes<HTMLElement>,
    Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "download" | "href"> {
  as?: React.ElementType
  isDisabled?: boolean
  variant?: "primary" | "secondary"
}

export function Button({
  as,
  className: classNameProp,
  isDisabled,
  variant = "primary",
  ...props
}: ButtonProps) {
  const Component = as ?? (props.href ? Link : "button")

  return (
    <Component
      className={clsx(
        "focusable inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm outline-offset-2 transition-all active:transition-none",
        variantStyles[variant],
        isDisabled ? "pointer-events-none opacity-50" : "cursor-pointer",
        classNameProp,
      )}
      {...props}
    />
  )
}
