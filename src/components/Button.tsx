import clsx from "clsx"
import Link from "next/link"

const variantStyles = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
}

export interface ButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "download" | "href"> {
  as?: React.ElementType
  variant?: "primary" | "secondary"
}

export function Button({
  as,
  className: classNameProp,
  variant = "primary",
  ...props
}: ButtonProps) {
  const Component = as ?? (props.href ? Link : "button")

  return (
    <Component
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
        variantStyles[variant],
        classNameProp
      )}
      {...props}
    />
  )
}
