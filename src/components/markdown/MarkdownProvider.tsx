import { MDXProvider } from "@mdx-js/react"
import { MarkdownImage } from "./MarkdownImage"

const components = {
  img: MarkdownImage,
}

export interface MarkdownProviderProps {
  children: React.ReactNode
}

export function MarkdownProvider({ children }: MarkdownProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
