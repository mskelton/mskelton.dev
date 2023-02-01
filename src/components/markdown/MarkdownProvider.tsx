import { MDXProvider } from "@mdx-js/react"
import { MarkdownImage } from "./MarkdownImage.js"
import { MarkdownLink } from "./MarkdownLink.js"
import { MarkdownPre } from "./MarkdownPre.js"

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
