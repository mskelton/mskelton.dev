import ToolContainer from "components/ToolContainer"
import { PageTitle } from "../PageTitle"

export interface ToolLayoutProps {
  children?: React.ReactNode
  title: React.ReactNode
}

export function ToolLayout({ children, title }: ToolLayoutProps) {
  return (
    <ToolContainer className="mt-12 sm:mt-10">
      <PageTitle>{title}</PageTitle>
      <div className="mt-12">{children}</div>
    </ToolContainer>
  )
}
