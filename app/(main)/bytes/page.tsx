import { Metadata } from "next"
import { Card } from "../../components/Card"
import { SimpleLayout } from "../../components/layouts/SimpleLayout"
import { formatDate, toDateString } from "../../lib/formatDate"
import { searchBytes } from "./api"

export const metadata: Metadata = {
  description: `Bytes is a collection of short-form articles about software engineering and developer experience.`,
  title: "Bytes - Mark Skelton",
}

export interface IArticle {
  date: string
  description: string
  slug: string
  title: string
}

export interface ArticleProps {
  article: IArticle
}

function Article({ article }: ArticleProps) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          className="md:hidden"
          dateTime={article.date}
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>

        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>

      <Card.Eyebrow
        as="time"
        className="mt-1 hidden transition-colors after:absolute after:left-[-37px] after:top-[4px] after:hidden after:h-4 after:w-4 after:rounded-full after:border-4 after:border-zinc-300 after:bg-zinc-100 after:transition-colors dark:after:border-zinc-600 dark:after:bg-zinc-800 md:block md:after:block"
        dateTime={article.date}
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default async function Blog({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q
  const bytes = await searchBytes(query ?? "")

  return (
    <SimpleLayout intro={metadata.description} title="hi">
      <div className="transition-colors md:border-l-2 md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {bytes.map((byte) => (
            <Article
              key={byte.slug}
              article={{
                ...byte,
                date: toDateString(byte.createdAt),
              }}
            />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
