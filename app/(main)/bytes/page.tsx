import { HashtagIcon } from "@heroicons/react/20/solid"
import { Metadata } from "next"
import { Card } from "../../components/Card"
import { formatDate, toDateString } from "../../lib/formatDate"
import { searchBytes } from "./api"
import BytesPage, { description } from "./BytesPage"

export const metadata: Metadata = {
  description,
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
    <BytesPage>
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
    </BytesPage>
  )
}
