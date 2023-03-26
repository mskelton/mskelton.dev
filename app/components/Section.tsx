import { useId } from "react"

export interface SectionProps {
  children: React.ReactNode
  title: string
}

export function Section({ children, title }: SectionProps) {
  const id = useId()

  return (
    <section
      aria-labelledby={id}
      className="transition-colors md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    >
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2
          className="text-sm font-semibold text-zinc-800 transition-colors dark:text-zinc-100"
          id={id}
        >
          {title}
        </h2>

        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  )
}
