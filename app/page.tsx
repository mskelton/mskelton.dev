import { ChevronRightIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import type { SocialLinkProps } from "./(main)/about/page"
import type { PostProps } from "./(main)/blog/page"
import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { Container } from "./components/Container"
import { BriefcaseIcon } from "./components/icons"
import { LogoCKH } from "./components/logos/LogoCKH"
import { LogoFederato } from "./components/logos/LogoFederato"
import { LogoRamp } from "./components/logos/LogoRamp"
import { LogoWiden } from "./components/logos/LogoWiden"
import { PageSubtitle, PageTitle } from "./components/PageTitle"
import { Footer } from "./components/root/Footer"
import { Header } from "./components/root/Header"
import { HeaderSwoop } from "./components/root/Swoops"
import { socials } from "./components/SocialIcons"
import { formatDate } from "./lib/date"
import { getAllPosts } from "./lib/posts"
import { siteMeta } from "./lib/siteMeta"

function Post({ post }: PostProps) {
  return (
    <Card as="article">
      <Card.Title href={`/blog/${post.slug}`}>{post.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={post.date} decorate>
        {formatDate(post.date)}
      </Card.Eyebrow>

      <Card.Description>{post.description}</Card.Description>
      <Card.Cta>Read post</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <a className="group -m-1 rounded-full p-1 focusable" {...props}>
      <Icon className="size-6 text-zinc-500 transition group-hover:text-indigo-500 dark:text-zinc-300 dark:group-hover:text-indigo-400" />
    </a>
  )
}

type Role = {
  company: string
  end?: string
  href: string
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>
  start: string
  title: string
}

const resume: Role[] = [
  {
    company: "Ramp",
    href: "https://ramp.com",
    logo: LogoRamp,
    start: "2024",
    title: "Staff software engineer",
  },
  {
    company: "Federato",
    end: "2024",
    href: "https://www.federato.ai",
    logo: LogoFederato,
    start: "2023",
    title: "Staff software engineer",
  },
  {
    company: "Widen, an Acquia Company",
    end: "2023",
    href: "https://www.widen.com",
    logo: LogoWiden,
    start: "2019",
    title: "Staff software engineer",
  },
  {
    company: "CKH Consulting",
    end: "2019",
    href: "https://ckhconsulting.com",
    logo: LogoCKH,
    start: "2016",
    title: "Software developer",
  },
]

function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 transition-colors @container dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 transition-colors dark:text-zinc-100">
        <BriefcaseIcon className="size-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>

      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition-colors dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <role.logo
                aria-label={`${role.company} logo`}
                className="size-7"
              />
            </div>

            <dl className="flex w-full flex-col flex-wrap gap-x-2 @[400px]:flex-row">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none">
                <a
                  className="-mx-1 rounded px-1 text-sm font-medium text-zinc-900 transition-colors focusable hover:text-indigo-500 dark:text-zinc-100 dark:hover:text-indigo-400"
                  href={role.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {role.company}
                </a>
              </dd>

              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 transition-colors dark:text-zinc-300">
                {role.title}
              </dd>

              <dt className="sr-only">Date</dt>
              <dd
                aria-label={
                  role.end
                    ? `${role.start} until ${role.end}`
                    : `${role.start} — now`
                }
                className="text-xs text-zinc-400 transition-colors @[400px]:ml-auto dark:text-zinc-500"
              >
                <time dateTime={role.start}>{role.start}</time>{" "}
                <span aria-hidden="true">—</span>{" "}
                {role.end ? (
                  <time dateTime={role.end}>{role.end}</time>
                ) : (
                  <span>now</span>
                )}
              </dd>
            </dl>
          </li>
        ))}
      </ol>

      <Button
        as={Link}
        className="group mt-6 w-full"
        href="/resume"
        variant="secondary"
      >
        View Resume
        <ChevronRightIcon className="size-5" />
      </Button>
    </div>
  )
}

export default async function Home() {
  const posts = (await getAllPosts())
    .slice(0, 4)
    .map(({ component: _, ...meta }) => meta)

  return (
    <>
      <Header variant="home" />

      <main className="relative z-[60] bg-inherit pb-16 lg:pb-32">
        <div className="absolute -top-16 left-0 right-0 z-50 w-full overflow-hidden">
          <HeaderSwoop className="h-16 w-full min-w-[500px] lg:h-28" />
        </div>

        <Container className="pt-6 sm:pt-12 lg:pt-20">
          <div className="max-w-2xl">
            <PageTitle>{siteMeta.tagline}</PageTitle>
            <PageSubtitle>{siteMeta.description}</PageSubtitle>

            <div className="mt-6 flex gap-6">
              {socials.map(({ label, ...social }) => (
                <SocialLink key={social.href} aria-label={label} {...social} />
              ))}
            </div>
          </div>
        </Container>

        <Container className="mt-24 md:mt-28">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-16">
              {posts.map((post) => (
                <Post key={post.slug} post={post} />
              ))}

              <Button as={Link} href="/blog" variant="secondary">
                <span>More posts</span>
                <ChevronRightIcon className="size-5" />
              </Button>
            </div>

            <div className="space-y-10 lg:pl-16 xl:pl-24">
              {/* <Newsletter /> */}
              <Resume />
            </div>
          </div>
        </Container>
      </main>

      <Footer variant="home" />
    </>
  )
}
