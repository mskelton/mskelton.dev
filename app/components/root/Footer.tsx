import { HeartIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import Link from "next/link"
import { projects } from "../../(main)/projects/projects"
import { Container } from "../Container"
import { socials } from "../SocialIcons"
import { CursiveName } from "./CursiveName"

const styles = {
  list: "grid gap-y-2",
  listTitle: "mb-3 text-xs font-medium text-zinc-800 dark:text-zinc-100",
}

export interface FooterLinkProps {
  children?: React.ReactNode
  href: string
}

function FooterLink({ children, href }: FooterLinkProps) {
  return (
    <li>
      <Link
        className="group flex items-center transition hover:text-indigo-600 dark:text-zinc-200 dark:hover:text-indigo-400"
        href={href}
      >
        <span className="text-xs">{children}</span>
      </Link>
    </li>
  )
}

export interface FooterProps {
  home?: boolean
}

export function Footer({ home }: FooterProps) {
  return (
    <footer className={clsx("mt-32", home && "bg-blue-100 dark:bg-zinc-800")}>
      <Container.Outer>
        <div className={clsx("py-10", home && "py-16")}>
          <Container.Inner>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
              <div className="flex flex-col items-start justify-between self-stretch text-sm text-zinc-800 dark:text-zinc-200">
                <div>
                  <CursiveName className="mt-4 mb-2 h-5 text-zinc-800 dark:text-zinc-100" />
                  <p className="text-zinc-600 dark:text-zinc-300">
                    Made with{" "}
                    <HeartIcon className="inline h-4 w-4 text-red-500" /> in
                    Wisconsin.
                  </p>
                </div>

                <p className="text-[0.75rem] text-zinc-500 dark:text-zinc-400">
                  &copy; {new Date().getFullYear()} Mark Skelton. All rights
                  reserved.
                </p>
              </div>

              <div className="flex gap-28">
                <div>
                  <p className={styles.listTitle}>Projects</p>

                  <ul className={clsx(styles.list, "grid-cols-2 gap-x-8")}>
                    {projects.map(({ link, name, shortName }) => (
                      <FooterLink key={link.href} href={link.href}>
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
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
