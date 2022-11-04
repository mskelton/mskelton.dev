import { MDXProvider } from "@mdx-js/react"
import { MarkdownImage } from "./MarkdownImage"
import { MarkdownLink } from "./MarkdownLink"

const components = {
  a: MarkdownLink,
  img: MarkdownImage,
}

export interface MarkdownProviderProps {
  children: React.ReactNode
}

export function MarkdownProvider({ children }: MarkdownProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
