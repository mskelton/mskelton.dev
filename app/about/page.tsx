import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Container } from "components/Container"
import { socials } from "components/SocialIcons"
import portraitImage from "images/portrait.jpg"
import { siteMeta } from "lib/siteMeta"

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
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Hi, I’m Mark 👋
          </h1>

          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’m a staff software engineer working at Widen. While I’m not
              afraid of CSS, my true passion lies in JavaScript engineering and
              developer experience (DX). I love finding ways to simplify or
              improve development workflow to save time and make it more fun to
              work on applications. Wait, did I forget to mention how much I
              love TypeScript?
            </p>

            <p>
              Outside of work, I’m a small town kid from Wisconsin who loves
              small town life almost as much as I like snow and winter. In my
              free time I like working on my house, working on software side
              projects, spending time with friends, and playing disc golf. I am
              also a devout Christian seeking to be more like Jesus in word,
              thought, and deed.
            </p>

            <p>
              While I am a software engineer and a total nerd, I’m a huge
              extrovert and love spending time with people. If you ever want to
              debate the usefulness of college education for professions like
              computer science, I will gladly oblige as I am a self-taught
              developer who found very little practical value in college behind
              getting that slip of paper they call a diploma.
            </p>
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
