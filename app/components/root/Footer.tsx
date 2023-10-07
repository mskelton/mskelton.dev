import { HeartIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import Link from "next/link"
import { projects } from "../../(main)/projects/projects"
import { Container } from "../Container"
import { socials } from "../SocialIcons"
import { Copyright } from "./Copyright"
import { CursiveName } from "./CursiveName"

const styles = {
  list: "grid gap-y-2",
  listTitle:
    "mb-3 text-xs font-medium text-zinc-800 dark:text-zinc-100 transition-colors",
}

export interface FooterLinkProps {
  children?: React.ReactNode
  href: string
}

function FooterLink({ children, href }: FooterLinkProps) {
  return (
    <li>
      <Link
        className="focusable group -mx-2 flex items-center rounded px-2 transition hover:text-indigo-500 dark:text-zinc-200 dark:hover:text-indigo-400"
        href={href}
        prefetch={false}
      >
        <span className="text-xs">{children}</span>
      </Link>
    </li>
  )
}

export interface FooterProps {
  variant: "home" | "main"
}

export function Footer({ variant }: FooterProps) {
  return (
    <footer
      className={clsx(
        variant === "home"
          ? "bg-blue-100/80 transition-colors dark:bg-slate-800"
          : "mt-16 lg:mt-32",
      )}
    >
      <Container>
        <div className={clsx("py-10", variant === "home" && "py-16")}>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
            <div className="flex flex-col justify-between self-stretch text-sm text-zinc-800 transition-colors dark:text-zinc-200">
              <div className="w-full">
                <CursiveName
                  className="mx-auto mt-1 w-32 md:mx-0"
                  textClassName="text-zinc-800 dark:text-zinc-100"
                />

                <p className="text-center text-zinc-600 transition-colors dark:text-zinc-300 md:text-left">
                  Made with{" "}
                  <HeartIcon className="inline h-4 w-4 text-red-500" /> in
                  Wisconsin.
                </p>
              </div>

              <Copyright className="hidden md:block" />
            </div>

            <div className="flex w-full flex-shrink-0 justify-center gap-14 md:w-auto md:justify-start lg:gap-20">
              <div>
                <p className={styles.listTitle}>Projects</p>

                <ul
                  className={clsx(
                    styles.list,
                    "grid-cols-1 gap-x-4 min-[400px]:grid-cols-2 lg:gap-x-8",
                  )}
                >
                  {projects
                    .filter((project) => project.footer)
                    .map(({ href, name, shortName }) => (
                      <FooterLink key={href} href={href}>
                        {shortName ?? name}
                      </FooterLink>
                    ))}
                </ul>
              </div>

              <div>
                <p className={styles.listTitle}>Socials</p>

                <ul className={styles.list}>
                  {socials.slice(0, -1).map(({ href, name }) => (
                    <FooterLink key={href} href={href}>
                      {name}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </div>

            <Copyright className="mt-4 block md:hidden" />
          </div>
        </div>
      </Container>
    </footer>
  )
}
