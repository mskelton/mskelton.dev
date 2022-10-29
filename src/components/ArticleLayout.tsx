import Head from "next/head"
import { useRouter } from "next/router"
import { Container } from "components/Container"
import { Prose } from "components/Prose"
import { formatDate } from "lib/formatDate"
import { MarkdownProvider } from "./markdown/MarkdownProvider"

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export interface ArticleMeta {
  date: string
  description: string
  title: string
}

export interface ArticleLayoutProps {
  children: React.ReactNode
  isRssFeed?: boolean
  meta: ArticleMeta
  previousPathname: string
}

export function ArticleLayout({
  children,
  isRssFeed = false,
  meta,
  previousPathname,
}: ArticleLayoutProps) {
  const router = useRouter()

  return isRssFeed ? (
    children
  ) : (
    <>
      <Head>
        <title>{`${meta.title} - Mark Skelton`}</title>
        <meta content={meta.description} name="description" />
      </Head>

      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {previousPathname && (
              <button
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
                onClick={() => router.back()}
                type="button"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}

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

              <MarkdownProvider>
                <Prose className="mt-8">{children}</Prose>
              </MarkdownProvider>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
