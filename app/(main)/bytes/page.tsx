import { FaceFrownIcon, HashtagIcon } from "@heroicons/react/20/solid"
import { Metadata } from "next"
import { Card } from "../../components/Card"
import Input from "../../components/Input"
import { SimpleLayout } from "../../components/layouts/SimpleLayout"
import { formatDate, toDateString } from "../../lib/formatDate"
import { searchBytes } from "./api"

export const metadata: Metadata = {
  description:
    "Bytes is my collection of short-form articles, tips, and things I learn as I build software.",
  title: "Bytes - Mark Skelton",
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
      <form>
        <Input
          aria-label="Search for bytes"
          className="mt-6 w-96 max-w-full"
          defaultValue={query}
          name="q"
          placeholder="Search for bytes..."
        />
      </form>

      {bytes.length ? (
        <div className="mt-16 grid grid-cols-[repeat(auto-fill,minmax(min(360px,100%),1fr))] gap-12 sm:mt-20">
          {bytes.map((byte) => {
            const date = toDateString(byte.createdAt)

            return (
              <article key={byte.id}>
                <Card>
                  <div className="w-full grid-cols-2 sm:grid">
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
