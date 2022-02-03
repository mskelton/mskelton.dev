import { ReactNode } from "react"
import { Footer } from "~/components/Footer"
import { Link } from "~/components/Link"
import { MobileNav } from "~/components/MobileNav"
import SectionContainer from "~/components/SectionContainer"
import ThemeSwitch from "~/components/ThemeSwitch"
import headerNavLinks from "~/data/headerNavLinks"
import metadata from "~/data/metadata"

interface LayoutWrapperProps {
  children?: ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link aria-label={metadata.title} href="/">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <img
                    alt="Mark Skelton"
                    className="h-10 w-10 rounded-full"
                    src="/images/me.jpg"
                  />
                </div>

                <p className="hidden text-2xl font-semibold sm:block">
                  {metadata.title}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  className="link-secondary p-1 font-medium sm:p-4"
                  href={link.href}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>

        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}
