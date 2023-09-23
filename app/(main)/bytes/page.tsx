import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FaceFrownIcon,
  HashtagIcon,
} from "@heroicons/react/20/solid"
import { Metadata } from "next"
import Link from "next/link"
import { Card } from "components/Card"
import Input from "components/Input"
import { SimpleLayout } from "components/layouts/SimpleLayout"
import { formatDate, toDateString } from "lib/date"
import { Direction, searchBytes } from "./api"
import PageLink from "./PageLink"

export const metadata: Metadata = {
  description:
    "Bytes is my collection of short-form posts, tips, and things I learn as I build software.",
  title: "Bytes | Mark Skelton",
}

export default async function Blog({
  searchParams,
}: {
  searchParams: {
    after?: string
    before?: string
    q?: string
    tag?: string
  }
}) {
  const { after, before, q: query, tag } = searchParams
  const direction: Direction = after ? "right" : before ? "left" : "none"
  const { bytes, nextHref, prevHref } = await searchBytes({
    cursor: after ?? before,
    direction,
    query,
    tag,
  })

  return (
    <SimpleLayout
      intro={metadata.description}
      noMargin
      title="Bits and bytes of code"
    >
      <div className="w-96 max-w-full">
        <form role="search">
          {before ? <input name="before" type="hidden" value={before} /> : null}
          {after ? <input name="after" type="hidden" value={after} /> : null}

          <Input
            aria-label="Search bytes"
            className="mt-6 w-full"
            defaultValue={query}
            name="q"
            placeholder="Search for bytes..."
          />
        </form>

        {query || tag ? (
          <div className="mt-2 flex justify-between px-2 text-sm">
            <p
              className="transition-colors dark:text-zinc-200"
              data-testid="search-hint"
            >
              Showing results for{" "}
              <span className="font-bold">
                {query ? `“${query}”` : `#${tag}`}
              </span>
            </p>

            <Link
              className="font-medium text-indigo-500 transition-colors hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-500"
              href="/bytes"
            >
              Clear
            </Link>
          </div>
        ) : null}
      </div>

      {bytes.length ? (
        <div className="mt-16 flex flex-col gap-16 sm:mt-20">
          {bytes.map((byte) => {
            const date = toDateString(byte.createdAt)

            return (
              <article key={byte.id}>
                <Card>
                  <div className="w-full grid-cols-[1fr,auto] sm:grid">
                    <Card.Title href={`/bytes/${byte.slug}`}>
                      {byte.title}
                    </Card.Title>

                    <Card.Eyebrow
                      as="time"
                      className="order-2 mb-1"
                      dateTime={date}
                    >
                      {formatDate(byte.createdAt)}
                    </Card.Eyebrow>

                    <Card.Tags className="order-1 mb-2 justify-self-end sm:mb-0">
                      {byte.tags.map((tag) => (
                        <Card.Tag key={tag.id} href={`/bytes?tag=${tag.name}`}>
                          <HashtagIcon className="-ml-0.5 h-3 w-3" />
                          {tag.name}
                        </Card.Tag>
                      ))}
                    </Card.Tags>
                  </div>

                  <Card.Description>{byte.description}</Card.Description>
                  <Card.Cta>Read byte</Card.Cta>
                </Card>
              </article>
            )
          })}

          {prevHref || nextHref ? (
            <div className="mt-12 flex items-center justify-center gap-6">
              <PageLink href={prevHref}>
                <ChevronLeftIcon className="h-4 w-4" />
                Previous page
              </PageLink>

              <PageLink href={nextHref}>
                Next page
                <ChevronRightIcon className="h-4 w-4" />
              </PageLink>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mx-auto mt-24 flex max-w-xl flex-col items-center text-center text-base text-zinc-600 transition-colors dark:text-zinc-400">
          <FaceFrownIcon className="mb-3 h-12 w-12" />
          <span className="mb-1">
            We couldn’t find any bytes matching{" "}
            <span className="font-bold">“{query}”</span>.
          </span>
          <span>Try another query or reset your search to view all bytes.</span>
        </p>
      )}
    </SimpleLayout>
  )
}
