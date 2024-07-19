export interface ErrorPageProps {
  action: React.ReactNode
  code: number
  subtitle: React.ReactNode
  title: React.ReactNode
}

export default function ErrorPage({
  action,
  code,
  subtitle,
  title,
}: ErrorPageProps) {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p
          className="text-base font-semibold text-indigo-600 dark:text-indigo-400"
          data-testid="code"
        >
          {code}
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
          {title}
        </h1>

        <p
          className="prose mt-6 max-w-xl text-base leading-7 text-zinc-700 dark:prose-invert dark:text-zinc-300"
          data-testid="subtitle"
        >
          {subtitle}
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          {action}
        </div>
      </div>
    </div>
  )
}
