import { ArrowDownIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import type { SocialLinkProps } from "./(main)/about/page"
import type { ArticleProps } from "./(main)/blog/page"
import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { Container } from "./components/Container"
import { BriefcaseIcon } from "./components/icons"
import { LogoCKH } from "./components/logos/LogoCKH"
import { LogoFederato } from "./components/logos/LogoFederato"
import { LogoWiden } from "./components/logos/LogoWiden"
import { PageSubtitle, PageTitle } from "./components/PageTitle"
import { Footer } from "./components/root/Footer"
import { Header } from "./components/root/Header"
import { socials } from "./components/SocialIcons"
import { formatDate } from "./lib/formatDate"
import { getAllArticles } from "./lib/getAllArticles"
import { siteMeta } from "./lib/siteMeta"

function Article({ article }: ArticleProps) {
  return (
    <Card as="article">
      <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>

      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 text-zinc-500 transition group-hover:text-indigo-500 dark:text-zinc-400 dark:group-hover:text-indigo-400" />
    </Link>
  )
}

const resume = [
  {
    company: "Federato",
    end: "Present",
    href: "https://www.federato.ai",
    logo: LogoFederato,
    start: "2023",
    title: "Senior software engineer",
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
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>

      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition-colors dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <role.logo
                aria-label={`${role.company} logo`}
                className="h-7 w-7"
              />
            </div>

            <dl className="flex w-full flex-col flex-wrap gap-x-2 @[400px]:flex-row">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none">
                <a
                  className="text-sm font-medium text-zinc-900 transition-colors hover:text-indigo-500 dark:text-zinc-100 dark:hover:text-indigo-400"
                  href={role.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {role.company}
                </a>
              </dd>

              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 transition-colors dark:text-zinc-400">
                {role.title}
              </dd>

              <dt className="sr-only">Date</dt>
              <dd
                aria-label={`${role.start} until ${role.end}`}
                className="text-xs text-zinc-400 transition-colors @[400px]:ml-auto dark:text-zinc-500"
              >
                <time dateTime={role.start}>{role.start}</time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time
                  dateTime={
                    roleIndex ? role.end : new Date().getFullYear().toString()
                  }
                >
                  {role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>

      <Button
        as="a"
        className="group mt-6 w-full"
        download
        href="/mark-skelton.pdf"
        variant="secondary"
      >
        Download resume
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

export default async function Home() {
  const articles = (await getAllArticles())
    .slice(0, 4)
    .map(({ component: _, ...meta }) => meta)

  return (
    <>
      <Header home />

      <main>
        <Container className="mt-6 sm:mt-10">
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
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>

            <div className="space-y-10 lg:pl-16 xl:pl-24">
              {/* <Newsletter /> */}
              <Resume />
            </div>
          </div>
        </Container>
      </main>

      <Footer home />
    </>
  )
}
