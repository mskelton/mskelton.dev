import Link from "next/link"
import { formatDate } from "lib/formatDate"
import { Container } from "../../app/components/Container"
import { ArrowLeftIcon } from "../../app/components/icons"
import { Prose } from "../../app/components/Prose"

export interface ArticleMeta {
  date: string
  description: string
  title: string
}

export interface ArticleLayoutProps {
  children: React.ReactNode
  meta: ArticleMeta
}

export function ArticleLayout({ children, meta }: ArticleLayoutProps) {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            aria-label="Go back to articles"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
            href="/blog"
            type="button"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </Link>

          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {meta.title}
              </h1>

              <time
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                dateTime={meta.date}
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(meta.date)}</span>
              </time>
            </header>

            <Prose className="mt-8">{children}</Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
