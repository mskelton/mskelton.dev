import { Container } from "../Container"
import { PageSubtitle, PageTitle } from "../PageTitle"

export interface SimpleLayoutProps {
  children?: React.ReactNode
  intro: React.ReactNode
  noMargin?: boolean
  title: React.ReactNode
}

export function SimpleLayout({
  children,
  intro,
  noMargin = false,
  title,
}: SimpleLayoutProps) {
  return (
    <Container className="mt-16 sm:mt-20">
      <header className="max-w-2xl">
        <PageTitle>{title}</PageTitle>
        <PageSubtitle>{intro}</PageSubtitle>
      </header>

      <div className={noMargin ? "" : "mt-16 sm:mt-20"}>{children}</div>
    </Container>
  )
}
