import { EnvelopeIcon } from "@heroicons/react/24/solid"
import { Metadata } from "@playwright/test"
import { clsx } from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Container } from "../../components/Container"
import { PageTitle } from "../../components/PageTitle"
import { socials } from "../../components/SocialIcons"
import portraitImage from "../../images/portrait.jpg"
import { siteMeta } from "../../lib/siteMeta"
import Content from "./content.mdx"

export const metadata: Metadata = {
  description: siteMeta.description,
  title: "About - Mark Skelton",
}

export interface SocialLinkProps {
  children?: React.ReactNode
  className?: string
  href: string
  icon: React.FunctionComponent<{ className?: string }>
}

function SocialLink({
  children,
  className,
  href,
  icon: Icon,
}: SocialLinkProps) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-indigo-500 dark:text-zinc-200 dark:hover:text-indigo-400"
        href={href}
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-indigo-500 dark:group-hover:fill-indigo-400" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-20">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              alt=""
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              priority
              sizes="(min-width: 1024px) 32rem, 20rem"
              src={portraitImage}
            />
          </div>
        </div>

        <div className="lg:order-first lg:row-span-2">
          <PageTitle>Hi, I’m Mark 👋</PageTitle>

          <div className="space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <Content />
          </div>
        </div>

        <div className="lg:pl-20">
          <ul role="list">
            {socials.map(({ label, ...social }) => (
              <SocialLink key={social.href} className="mt-4" {...social}>
                {label}
              </SocialLink>
            ))}

            <SocialLink
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              href={`mailto:${siteMeta.email}`}
              icon={EnvelopeIcon}
            >
              {siteMeta.email}
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
