import { InferGetStaticPropsType } from "next"
import Head from "next/head"
import { Card } from "components/Card"
import { SimpleLayout } from "components/SimpleLayout"
import { formatDate } from "lib/formatDate"
import { getAllArticles } from "lib/getAllArticles"

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
        className="mt-1 hidden md:block"
        dateTime={article.date}
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(
        ({ component: _, ...meta }) => meta
      ),
    },
  }
}

export default function Blog({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Blog - Mark Skelton</title>
        <meta
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
          name="description"
        />
      </Head>

      <SimpleLayout
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        title="Writing on software design, company building, and the aerospace industry."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}
