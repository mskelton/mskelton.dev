import { clsx } from "clsx"
import Link, { LinkProps } from "next/link"

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

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

interface CardLinkProps extends LinkProps<string> {
  children?: React.ReactNode
}

Card.Link = function CardLink({ children, ...props }: CardLinkProps) {
  return (
    <>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

interface CardTitleProps {
  as?: React.ElementType
  children: React.ReactNode
  href?: string
}

Card.Title = function CardTitle({
  as: Component = "h2",
  children,
  href,
}: CardTitleProps) {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

export interface CardDescriptionProps {
  children: React.ReactNode
}

Card.Description = function CardDescription({
  children,
}: CardDescriptionProps) {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
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
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
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
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 flex items-center"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}

      {children}
    </Component>
  )
}
