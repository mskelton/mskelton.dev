import { Metadata } from "next"
import { Card } from "../../components/Card"
import MiniMd from "../../components/MiniMd"
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
              <div className="grid w-full grid-cols-2">
                <Card.Title href={`/bytes/${byte.slug}`}>
                  {byte.title}
                </Card.Title>

                <Card.Tags className="justify-self-end">
                  {byte.tags.map((tag) => (
                    <Card.Tag key={tag.id} href={`/bytes?tag=${tag.name}`}>
                      {tag.name}
                    </Card.Tag>
                  ))}
                </Card.Tags>

                <Card.Eyebrow as="time" className="order-none" dateTime={date}>
                  {formatDate(byte.createdAt)}
                </Card.Eyebrow>
              </div>

              <Card.Description>
                <MiniMd>{byte.description}</MiniMd>
              </Card.Description>

              <Card.Cta>Read byte</Card.Cta>
            </Card>
          </article>
        )
      })}
    </BytesPage>
  )
}
