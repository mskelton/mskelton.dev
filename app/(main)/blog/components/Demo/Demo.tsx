import clsx from "clsx"

export interface DemoProps {
  center?: boolean
  children: React.ReactNode
}

export default function Demo({ center = false, children }: DemoProps) {
  return (
    <div className="relative rounded-lg border border-zinc-200 transition-colors dark:border-zinc-700/80">
      <div
        className={clsx(
          "not-prose w-full p-4",
          center && "flex justify-center",
        )}
      >
        {children}
      </div>
    </div>
  )
}
