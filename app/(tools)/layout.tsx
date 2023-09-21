import { Copyright } from "components/root/Copyright"
import { Header } from "components/root/Header"
import ToolContainer from "components/ToolContainer"

export interface ToolsLayoutProps {
  children?: React.ReactNode
}

export default function ToolsLayout({ children }: ToolsLayoutProps) {
  return (
    <>
      <Header variant="tools" />
      <main className="flex flex-1 flex-col">{children}</main>
      <footer>
        <ToolContainer>
          <Copyright className="mb-4 mt-12" />
        </ToolContainer>
      </footer>
    </>
  )
}
