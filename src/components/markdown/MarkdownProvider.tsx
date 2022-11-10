import { MDXProvider } from "@mdx-js/react"
import { MarkdownImage } from "./MarkdownImage"
import { MarkdownLink } from "./MarkdownLink"
import { MarkdownPre } from "./MarkdownPre"

const components = {
  a: MarkdownLink,
  img: MarkdownImage,
  pre: MarkdownPre,
}

export interface MarkdownProviderProps {
  children: React.ReactNode
}

export function MarkdownProvider({ children }: MarkdownProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
