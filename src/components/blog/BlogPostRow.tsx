import { ReactNode } from "react"

export function BlogPostRow({ children }: BlogPostRowProps) {
  return <div className="flex gap-4">{children}</div>
}

export interface BlogPostRowProps {
  children: ReactNode
}
