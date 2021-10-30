import Image from "next/image"
import { ReactNode } from "react"
import headerNavLinks from "data/headerNavLinks"
import siteMetadata from "data/siteMetadata"
import logo from "../images/logo.jpg"
import Footer from "./Footer"
import Link from "./Link"
import MobileNav from "./MobileNav"
import SectionContainer from "./SectionContainer"
import ThemeSwitch from "./ThemeSwitch"

interface LayoutWrapperProps {
  children?: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link aria-label={siteMetadata.title} href="/">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Image
                    alt={siteMetadata.author}
                    className="rounded-full"
                    height={40}
                    src={logo}
                    width={40}
                  />
                </div>

                <p className="hidden text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
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
