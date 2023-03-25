import clsx from "clsx"

export type CopyrightProps = React.HTMLAttributes<HTMLParagraphElement>

export function Copyright({ className, ...props }: CopyrightProps) {
  return (
    <p
      className={clsx(
        "text-[0.75rem] text-zinc-500 dark:text-zinc-400",
        className
      )}
      {...props}
    >
      &copy; 2021-{new Date().getFullYear()} Mark Skelton. All rights reserved.
    </p>
  )
}
