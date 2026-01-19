import MarkdownImage from './components/markdown/MarkdownImage'
import MarkdownLink from './components/markdown/MarkdownLink'
import MarkdownPre from './components/markdown/MarkdownPre'

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
