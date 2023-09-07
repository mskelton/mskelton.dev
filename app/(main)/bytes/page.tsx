import { FaceFrownIcon, HashtagIcon } from "@heroicons/react/20/solid"
import { Metadata } from "next"
import Link from "next/link"
import { Card } from "components/Card"
import Input from "components/Input"
import { SimpleLayout } from "components/layouts/SimpleLayout"
import { formatDate, toDateString } from "lib/date"
import { searchBytes } from "./api"

export const metadata: Metadata = {
  description:
    "Bytes is my collection of short-form articles, tips, and things I learn as I build software.",
  title: "Bytes | Mark Skelton",
}

export default async function Blog({
  searchParams,
}: {
  searchParams: { q?: string; tag?: string }
}) {
  const { q: query, tag } = searchParams
  const bytes = await searchBytes({ query, tag })

  return (
    <SimpleLayout
      intro={metadata.description}
      noMargin
      title="Bits and bytes of code"
    >
      <div className="w-96 max-w-full">
        <form>
          <Input
            aria-label="Search for bytes"
            className="mt-6 w-full"
            defaultValue={query}
            name="q"
            placeholder="Search for bytes..."
          />
        </form>

        {query || tag ? (
          <div className="flex mt-2 text-sm justify-between px-2">
            <p className="dark:text-zinc-200 transition-colors">
              Showing results for{" "}
              <span className="font-bold">
                {query ? `“${query}”` : `#${tag}`}
              </span>
            </p>

            <Link
              className="text-indigo-500 transition-colors dark:text-indigo-400 font-medium dark:hover:text-indigo-500 hover:text-indigo-600"
              href="/bytes"
            >
              Clear
            </Link>
          </div>
        ) : null}
      </div>

      {bytes.length ? (
        <div className="mt-16 space-y-16 sm:mt-20">
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
