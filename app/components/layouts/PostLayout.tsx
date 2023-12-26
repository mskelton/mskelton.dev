import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { Container } from "components/Container"
import { PageTitle } from "components/PageTitle"
import { Prose } from "components/Prose"
import Skeleton from "components/Skeleton"
import { formatDate } from "lib/date"

export interface PostMeta {
  date: string
  description: string
  title: string
}

export interface PostLayoutProps {
  backHref: string
  backText: string
  children: React.ReactNode
  featuredImage?: React.ReactNode
  meta?: PostMeta
}

export function PostLayout({
  backHref,
  backText,
  children,
  featuredImage,
  meta,
}: PostLayoutProps) {
  return (
    <Container className="mt-16 sm:mt-20">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            aria-label={backText}
            className="mb-8 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition hover:text-zinc-700 hover:ring-zinc-200 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-500 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:text-zinc-400 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 lg:flex xl:-top-1.5 xl:left-0 xl:mt-0"
            href={backHref}
            type="button"
          >
            <ArrowLeftIcon className="s-4" />
          </Link>

          <article>
            <header className="flex flex-col">
              {meta ? (
                <PageTitle className="text-3xl sm:text-4xl">
                  {meta.title}
                </PageTitle>
              ) : (
                <Skeleton className="mb-2 h-10" />
              )}

              <div>
                {meta ? (
                  <time
                    className="text-base text-zinc-500 transition-colors dark:text-zinc-400"
                    dateTime={meta.date}
                  >
                    {formatDate(meta.date)}
                  </time>
                ) : (
                  <Skeleton className="h-6 w-40 rounded">{"\u200b"}</Skeleton>
                )}
              </div>

              {featuredImage ? (
                <div className="-mx-4 mb-12 mt-8 flex aspect-video items-center justify-center overflow-hidden sm:-ml-7 sm:-mr-6 sm:rounded-xl">
                  {featuredImage}
                </div>
              ) : null}
            </header>

            <Prose className="mt-8">{children}</Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
