import { Metadata } from "@playwright/test"
import { clsx } from "clsx"
import Image from "next/image"
import Link from "next/link"
import portraitImage from "images/portrait.jpg"
import { Container } from "../../components/Container"
import { socials } from "../../components/SocialIcons"
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
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
        href={href}
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              alt=""
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              sizes="(min-width: 1024px) 32rem, 20rem"
              src={portraitImage}
            />
          </div>
        </div>

        <div className="lg:order-first lg:row-span-2">
          <h1 className="mb-12 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Hi, I’m Mark 👋
          </h1>

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
              icon={MailIcon}
            >
              {siteMeta.email}
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
