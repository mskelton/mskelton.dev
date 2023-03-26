import clsx from "clsx"

export interface PageTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function PageTitle({ className, ...props }: PageTitleProps) {
  return (
    <h1
      className={clsx(
        "text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl",
        className
      )}
      {...props}
    />
  )
}

export interface PageSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function PageSubtitle(props: PageSubtitleProps) {
  return (
    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400" {...props} />
  )
}
