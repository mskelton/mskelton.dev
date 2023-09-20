import { Footer } from "components/root/Footer"
import { Header } from "components/root/Header"

export interface ToolsLayoutProps {
  children?: React.ReactNode
}

export default function ToolsLayout({ children }: ToolsLayoutProps) {
  return (
    <>
      <Header variant="tools" />
      <main className="flex-1">{children}</main>
      <Footer variant="tools" />
    </>
  )
}
