import { MarkdownImage } from "./src/components/markdown/MarkdownImage"
import { MarkdownLink } from "./src/components/markdown/MarkdownLink"
import { MarkdownPre } from "./src/components/markdown/MarkdownPre"

export function useMDXComponents(components: {
  [component: string]: React.ComponentType
}) {
  return {
    a: MarkdownLink,
    img: MarkdownImage,
    pre: MarkdownPre,
    ...components,
  }
}
