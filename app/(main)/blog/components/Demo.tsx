export interface DemoProps {
  children: React.ReactNode
  slug: string
  source: string
}

export default function Demo({ children, source }: DemoProps) {
  return (
    <div>
      {children}
      {source}
    </div>
  )
}
