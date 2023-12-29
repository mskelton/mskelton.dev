import Link from "next/link"
import { twMerge } from "tailwind-merge"
import { Container } from "../Container"
import { GitHubIcon } from "../SocialIcons"
import { CursiveName } from "./CursiveName"
import { DesktopNavigation } from "./DesktopNavigation"
import HeaderIconButton from "./HeaderIconButton"
import { MobileNavigation } from "./MobileNavigation"
import { ThemeToggle } from "./ThemeToggle"

export interface HeaderProps {
  variant: "home" | "main"
}

export function Header({ variant }: HeaderProps) {
  return (
    <header
      className={twMerge(
        "sticky z-50 flex flex-col pt-8",
        variant === "home"
          ? "top-0 h-40 bg-gradient-to-b from-blue-100/80 to-blue-200/80 before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-b before:from-slate-900/90 before:to-slate-800/90 before:opacity-0 before:transition-opacity before:duration-300 lg:h-60 dark:before:opacity-100"
          : "flex h-full animate-[header_1ms_linear_both] flex-col bg-white pb-2 transition-colors duration-300 [animation-range:0_80px] [animation-timeline:scroll()] dark:bg-zinc-900",
        variant === "main" && "-top-6",
      )}
    >
      <Container className="w-full">
        <div className="relative flex items-center gap-4">
          <Link className="-m-2 -mt-0.5 rounded p-2 focusable" href="/">
            <CursiveName
              className="w-40"
              swoop={variant === "home"}
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
