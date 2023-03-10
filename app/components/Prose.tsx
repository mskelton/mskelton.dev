import { clsx } from "clsx"

export interface ProseProps {
  children: React.ReactNode
  className?: string
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div className={clsx(className, "prose dark:prose-invert")}>{children}</div>
  )
}
