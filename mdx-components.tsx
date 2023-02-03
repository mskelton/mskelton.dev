import { MarkdownImage } from "./src/components/markdown/MarkdownImage.js"
import { MarkdownLink } from "./src/components/markdown/MarkdownLink.js"
import { MarkdownPre } from "./src/components/markdown/MarkdownPre.js"

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
