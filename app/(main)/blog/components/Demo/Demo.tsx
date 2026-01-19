import clsx from 'clsx'

export interface DemoProps {
  center?: boolean
  children: React.ReactNode
  tight?: boolean
}

export default function Demo({
  center = false,
  children,
  tight = false,
}: DemoProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-200 transition-colors dark:border-zinc-700/80">
      <div
        className={clsx(
          'not-prose w-full',
          center ? 'flex justify-center' : '',
          tight ? '' : 'p-4',
        )}
      >
        {children}
      </div>
    </div>
  )
}
