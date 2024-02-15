import { ChevronRightIcon, LinkIcon } from "@heroicons/react/20/solid"
import { clsx } from "clsx"
import Link, { LinkProps } from "next/link"
import { twMerge } from "tailwind-merge"

interface CardProps {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}

export function Card({
  as: Component = "div",
  children,
  className,
}: CardProps) {
  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  )
}

interface CardLinkProps extends Omit<LinkProps, "href"> {
  children?: React.ReactNode
  className?: string
  href: string
}

Card.Link = function CardLink({
  children,
  className,
  href,
  ...props
}: CardLinkProps) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      <Link
        className={clsx("-mx-2 rounded px-2 py-1 focusable", className)}
        {...props}
        href={href}
      >
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

interface CardTitleProps {
  as?: React.ElementType
  children: React.ReactNode
  href?: string
  prefetch?: boolean
}

Card.Title = function CardTitle({
  as: Component = "h2",
  children,
  href,
  prefetch,
}: CardTitleProps) {
  const className = "text-zinc-800 dark:text-zinc-100 transition-colors"

  return (
    <Component className="text-base font-semibold tracking-tight">
      {href ? (
        <Card.Link className={className} href={href} prefetch={prefetch}>
          {children}
        </Card.Link>
      ) : (
        <span className={className}>{children}</span>
      )}
    </Component>
  )
}

export interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

Card.Description = function CardDescription({
  children,
  className,
}: CardDescriptionProps) {
  return (
    <p
      className={clsx(
        "relative z-10 mt-2 text-sm text-zinc-700 transition-colors dark:text-zinc-300",
        className,
      )}
      data-testid="card-description"
    >
      {children}
    </p>
  )
}

export interface CardCtaProps {
  children?: React.ReactNode
}

Card.Cta = function CardCta({ children }: CardCtaProps) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-indigo-500 transition-colors dark:text-indigo-400"
    >
      {children}
      <ChevronRightIcon className="ml-1 size-5 transition-[margin] group-hover:ml-1.5" />
    </div>
  )
}

export interface CardEyebrowProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  dateTime?: string
  decorate?: boolean
}

Card.Eyebrow = function CardEyebrow({
  as: Component = "p",
  children,
  className,
  decorate = false,
  ...props
}: CardEyebrowProps) {
  return (
    <Component
      className={twMerge(
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500 transition-colors dark:text-zinc-400",
        decorate && "pl-3.5",
        className,
      )}
      {...props}
    >
      {decorate && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 flex items-center"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 transition-colors dark:bg-zinc-500" />
        </span>
      )}

      {children}
    </Component>
  )
}

const formatURL = (url: string) => new URL(url).hostname.replace("www.", "")

export interface CardExternalLinkProps {
  href: string
}

Card.ExternalLink = function CardExternalLink({ href }: CardExternalLinkProps) {
  return (
    <p className="relative z-10 mt-auto flex items-center justify-self-end text-sm font-medium text-zinc-800 transition group-hover:text-indigo-500 dark:text-zinc-200 dark:group-hover:text-indigo-400">
      <LinkIcon className="size-5" />
      <span className="ml-2">{formatURL(href)}</span>
    </p>
  )
}

export interface CardTagsProps {
  children?: React.ReactNode
  className?: string
}

Card.Tags = function CardTags({ children, className }: CardTagsProps) {
  return <div className={clsx("flex gap-2", className)}>{children}</div>
}

export interface CardTagProps {
  children?: React.ReactNode
  className?: string
  href: string
}

Card.Tag = function CardTag({ children, className, href }: CardTagProps) {
  return (
    <Link
      className={twMerge(
        "relative z-20 flex items-center gap-0.5 rounded-2xl px-4 py-0.5 text-xs font-medium transition-colors",
        "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 group-hover:bg-zinc-200/70 group-hover:hover:bg-zinc-200",
        "transition-all focusable dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:group-hover:bg-zinc-700/70 dark:group-hover:hover:bg-zinc-700/90",
        className,
      )}
      data-testid="card-tag"
      href={href}
    >
      {children}
    </Link>
  )
}
