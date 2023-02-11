"use client"

import { usePathname } from "next/navigation"
import { Container } from "components/Container"
import { Avatar } from "./Avatar"
import { AvatarContainer } from "./AvatarContainer"
import { DesktopNavigation } from "./DesktopNavigation"
import { MobileNavigation } from "./MobileNavigation"
import { ModeToggle } from "./ModeToggle"

export function Header() {
  const isHomePage = usePathname() === "/"

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && (
          <>
            <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]" />
            <Container className="top-0 order-last -mb-3 pt-3">
              <div className="top-[var(--avatar-top,theme(spacing.3))] w-full">
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <Avatar className="block h-24 w-24 origin-left" large />
                </div>
              </div>
            </Container>
          </>
        )}

        <div className="top-0 z-10 h-16 pt-6">
          <Container className="top-[var(--header-top,theme(spacing.6))] w-full">
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
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

      {isHomePage && <div style={{ height: "var(--content-offset)" }} />}
    </>
  )
}
