import { clsx } from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Button } from "components/Button.js"
import { Card } from "components/Card.js"
import { Container } from "components/Container.js"
import { ArrowDownIcon, BriefcaseIcon } from "components/icons.js"
import { socials } from "components/SocialIcons.js"
import logoCKH from "images/logos/ckh.webp"
import logoWiden from "images/logos/widen.svg"
import image1 from "images/photos/image-1.jpg"
import image2 from "images/photos/image-2.jpg"
import image3 from "images/photos/image-3.jpg"
import image4 from "images/photos/image-4.jpg"
import image5 from "images/photos/image-5.jpg"
import { formatDate } from "lib/formatDate.js"
// import { generateRssFeed } from "lib/generateRssFeed.js"
import { getAllArticles } from "lib/getAllArticles.js"
import { siteMeta } from "lib/siteMeta.js"
import type { SocialLinkProps } from "./about/page.js"
import type { ArticleProps } from "./blog/page.js"

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
    start: "2016",
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
              <Image
                alt={role.company}
                className="h-7 w-7"
                src={role.logo}
                unoptimized
              />
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

export default async function Home() {
  const articles = (await getAllArticles())
    .slice(0, 4)
    .map(({ component: _, ...meta }) => meta)

  // if (process.env.NODE_ENV === "production") {
  //   await generateRssFeed()
  // }

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {siteMeta.tagline}
          </h1>

          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {siteMeta.description}
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
            {/* <Newsletter /> */}
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
