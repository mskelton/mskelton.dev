export interface MiniMdProps {
  children: React.ReactNode
}

export default function MiniMd({ children }: MiniMdProps) {
  return <span>{children}</span>
}
