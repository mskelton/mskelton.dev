export interface CodeBlockProps {
  children: React.ReactElement
  filename: string
}

export default function CodeBlock({ children }: CodeBlockProps) {
  return children
}
