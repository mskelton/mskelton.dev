import { Container } from "components/Container"
import { DesktopNavigation } from "./DesktopNavigation"
import { MobileNavigation } from "./MobileNavigation"
import { ModeToggle } from "./ModeToggle"

export interface HeaderProps {
  avatar?: React.ReactNode
  children?: React.ReactNode
}

export function Header({ avatar, children }: HeaderProps) {
  return (
    <header
      className="pointer-events-none relative z-50 flex flex-col"
      style={{
        height: "var(--header-height)",
        marginBottom: "var(--header-mb)",
      }}
    >
      {children}

      <div className="top-0 z-10 h-16 pt-6">
        <Container className="top-[var(--header-top,theme(spacing.6))] w-full">
          <div className="relative flex items-center gap-4">
            <div className="flex flex-1">{avatar}</div>

            <div className="flex flex-1 justify-end md:justify-center">
              <MobileNavigation className="pointer-events-auto md:hidden" />
              <DesktopNavigation className="pointer-events-auto hidden md:block" />
            </div>
            <div className="flex justify-end md:flex-1">
              <div className="pointer-events-auto">
                <ModeToggle />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}
