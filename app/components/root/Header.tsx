import clsx from "clsx"
import Link from "next/link"
import { Container } from "../Container"
import { CursiveName } from "./CursiveName"
import { DesktopNavigation } from "./DesktopNavigation"
import { MobileNavigation } from "./MobileNavigation"
import { ModeToggle } from "./ModeToggle"
import { HeaderSwoop } from "./Swoops"

export interface HeaderProps {
  home?: boolean
}

export function Header({ home }: HeaderProps) {
  return (
    <header
      className={clsx(
        "z-50 flex flex-col",
        home &&
          "bg-gradient-to-b from-blue-100 to-blue-200 dark:from-zinc-800 dark:to-zinc-700"
      )}
    >
      <div className={clsx("top-0 z-10 py-6", home && "pb-12 lg:pb-20")}>
        <Container className="w-full">
          <div className="relative flex items-center gap-4">
            <Link className="mt-1.5" href="/">
              <CursiveName
                className="w-40 text-zinc-700 dark:text-white"
                swoop={home}
              />
            </Link>

            <DesktopNavigation className="ml-8 hidden flex-1 lg:flex" />

            <div className="flex justify-end gap-4 lg:flex-1">
              <MobileNavigation className="lg:hidden" />
              <ModeToggle />
            </div>
          </div>
        </Container>
      </div>

      {home && <HeaderSwoop className="-mb-px text-white dark:text-zinc-900" />}
    </header>
  )
}
