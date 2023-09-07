import clsx from "clsx"
import Link from "next/link"
import { Container } from "../Container"
import { GitHubIcon } from "../SocialIcons"
import { CursiveName } from "./CursiveName"
import { DesktopNavigation } from "./DesktopNavigation"
import HeaderIconButton from "./HeaderIconButton"
import { MobileNavigation } from "./MobileNavigation"
import { ThemeToggle } from "./ThemeToggle"

export interface HeaderProps {
  home?: boolean
}

export function Header({ home }: HeaderProps) {
  return (
    <header
      className={clsx(
        "sticky z-50 flex flex-col pt-8",
        home
          ? "relative top-0 h-40 bg-gradient-to-b from-blue-100/50 to-blue-200/50 before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-b before:from-slate-800 before:to-slate-700 before:opacity-0 before:transition-opacity before:duration-300 dark:before:opacity-100 lg:h-60"
          : "-top-6 flex h-full flex-col bg-white pb-2 transition-colors duration-300 dark:bg-zinc-900",
      )}
    >
      <Container className="w-full">
        <div className="relative flex items-center gap-4">
          <Link className="mt-1.5" href="/">
            <CursiveName
              className="w-40"
              swoop={home}
              textClassName="text-zinc-700 dark:text-zinc-100"
            />
          </Link>

          <DesktopNavigation className="ml-8 hidden flex-1 lg:flex" />

          <div className="flex flex-1 justify-end gap-2 sm:gap-3">
            <HeaderIconButton
              aria-label="Open source code on GitHub"
              as="a"
              href="https://github.com/mskelton/mskelton.dev"
              target="_blank"
            >
              <GitHubIcon />
            </HeaderIconButton>

            <ThemeToggle />
            <MobileNavigation className="lg:hidden" />
          </div>
        </div>
      </Container>
    </header>
  )
}
