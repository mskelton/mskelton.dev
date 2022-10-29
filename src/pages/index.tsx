import clsx from "clsx"
import Image from "next/future/image"
import Head from "next/head"
import Link from "next/link"
import { Button } from "components/Button"
import { Card } from "components/Card"
import { Container } from "components/Container"
import { socials } from "components/SocialIcons"
import logoCKH from "images/logos/ckh.webp"
import logoWiden from "images/logos/widen.svg"
import image1 from "images/photos/image-1.jpg"
import image2 from "images/photos/image-2.jpg"
import image3 from "images/photos/image-3.jpg"
import image4 from "images/photos/image-4.jpg"
import image5 from "images/photos/image-5.jpg"
import { formatDate } from "lib/formatDate"
import { generateRssFeed } from "lib/generateRssFeed"
import { getAllArticles } from "lib/getAllArticles"
import { SocialLinkProps } from "./about"
import { ArticleProps, IArticle } from "./blog"

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
      />
      <path
        className="stroke-zinc-400 dark:stroke-zinc-500"
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
      />
      <path
        className="stroke-zinc-400 dark:stroke-zinc-500"
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

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
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>

      <div className="mt-6 flex">
        <input
          aria-label="Email address"
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          placeholder="Email address"
          required
          type="email"
        />

        <Button className="ml-4 flex-none" type="submit">
          Join
        </Button>
      </div>
    </form>
  )
}

const resume = [
  {
    company: "Widen, an Acquia Company",
    end: "Present",
    logo: logoWiden,
    start: "2019",
    title: "Staff software engineer",
  },
  {
    company: "CKH Consulting",
    end: "2019",
    logo: logoCKH,
    start: "2017",
    title: "Software developer",
  },
]

function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>

      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image alt="" className="h-7 w-7" src={role.logo} unoptimized />
            </div>

            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>

              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>

              <dt className="sr-only">Date</dt>
              <dd
                aria-label={`${role.start} until ${role.end}`}
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
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

      <Button className="group mt-6 w-full" href="#" variant="secondary">
        Download resume
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos() {
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(min-width: 640px) 18rem, 11rem"
              src={image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === "production") {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component: _, ...meta }) => meta),
    },
  }
}

export interface HomeProps {
  articles: IArticle[]
}

export default function Home({ articles }: HomeProps) {
  return (
    <>
      <Head>
        <title>
          Mark Skelton - Software designer, founder, and amateur astronaut
        </title>
        <meta
          content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
          name="description"
        />
      </Head>

      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software developer, Christ follower, small town kid.
          </h1>

          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Mark, a software engineer based in Southern Wisconsin. I’m the
            founder and CEO of Planetaria, where we develop technologies that
            empower regular people to explore space on their own terms.
          </p>

          <div className="mt-6 flex gap-6">
            {socials.map(({ label, ...social }) => (
              <SocialLink key={social.href} aria-label={label} {...social} />
            ))}
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>

          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
