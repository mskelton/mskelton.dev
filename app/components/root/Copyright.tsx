import clsx from "clsx"

export interface CopyrightProps
  extends React.HTMLAttributes<HTMLParagraphElement>
{}

export function Copyright({ className, ...props }: CopyrightProps) {
  return (
    <p
      className={clsx(
        "text-[0.75rem] text-zinc-500 transition-colors dark:text-zinc-400",
        className,
      )}
      {...props}
    >
      &copy; 2021-{new Date().getFullYear()} Mark Skelton. All rights reserved.
    </p>
  )
}
