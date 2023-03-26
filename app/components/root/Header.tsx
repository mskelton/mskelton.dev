import clsx from "clsx"
import Link from "next/link"
import { Container } from "../Container"
import { GitHubIcon } from "../SocialIcons"
import { CursiveName } from "./CursiveName"
import { DesktopNavigation } from "./DesktopNavigation"
import HeaderIconButton from "./HeaderIconButton"
import { MobileNavigation } from "./MobileNavigation"
import { HeaderSwoop } from "./Swoops"
import { ThemeToggle } from "./ThemeToggle"

export interface HeaderProps {
  home?: boolean
}

export function Header({ home }: HeaderProps) {
  return (
    <header
      className={clsx(
        "z-10 flex flex-col pt-8",
        home
          ? "relative h-48 bg-gradient-to-b from-blue-100/50 to-blue-200/50 before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-b before:from-slate-800 before:to-slate-700 before:opacity-0 before:transition-opacity before:duration-300 dark:before:opacity-100 lg:h-72"
          : "sticky -top-6 flex h-full flex-col bg-white pb-2 transition-colors duration-300 dark:bg-zinc-900"
      )}
    >
      <Container className="sticky top-0 w-full">
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

      {home && (
        <div className="absolute -bottom-px left-0 right-0 z-10 w-full overflow-hidden">
          <HeaderSwoop className="h-16 w-full min-w-[500px] lg:h-28" />
        </div>
      )}
    </header>
  )
}
