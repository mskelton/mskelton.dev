import Image from "next/image"
import { ReactNode } from "react"
import metadata from "data/metadata"
import { navLinks } from "data/nav"
import logo from "../../public/images/me.jpg"
import { Footer } from "./Footer"
import { Link } from "./Link"
import { MobileNav } from "./MobileNav"
import SectionContainer from "./SectionContainer"
import ThemeSwitch from "./ThemeSwitch"

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
                  <Image
                    alt="Mark Skelton"
                    className="rounded-full"
                    height="40px"
                    src={logo}
                    width="40px"
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
              {navLinks.map((link) => (
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
