import { twMerge } from "tailwind-merge"

export interface PageTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function PageTitle({ className, ...props }: PageTitleProps) {
  return (
    <h1
      className={twMerge(
        "text-4xl font-bold tracking-tight text-zinc-800 transition-colors sm:text-5xl dark:text-zinc-100",
        className,
      )}
      {...props}
    />
  )
}

export interface PageSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function PageSubtitle(props: PageSubtitleProps) {
  return (
    <p
      className="mt-6 text-base text-zinc-700 transition-colors dark:text-zinc-300"
      {...props}
    />
  )
}
