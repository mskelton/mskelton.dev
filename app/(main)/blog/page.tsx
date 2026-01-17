import { Card } from "components/Card"
import { SimpleLayout } from "components/layouts/SimpleLayout"
import { formatDate } from "lib/date"
import { getAllPosts } from "lib/posts"
import { Metadata } from "next"

export const metadata: Metadata = {
  description: `All of my blog posts, even the ones that I might not fully agree with anymore. Software engineering is a process of continuous learning, don’t ever think there isn’t more to learn.`,
  title: "Blog | Mark Skelton",
}

export interface IPost {
  date: string
  description: string
  slug: string
  title: string
}

export interface PostProps {
  post: IPost
}

function Post({ post }: PostProps) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${post.slug}`}>{post.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          className="md:hidden"
          dateTime={post.date}
          decorate
        >
          {formatDate(post.date)}
        </Card.Eyebrow>

        <Card.Description>{post.description}</Card.Description>
        <Card.Cta>Read post</Card.Cta>
      </Card>

      <Card.Eyebrow
        as="time"
        className="mt-1 hidden transition-colors after:absolute after:top-[4px] after:left-[-37px] after:hidden after:h-4 after:w-4 after:rounded-full after:border-4 after:border-zinc-300 after:bg-zinc-100 after:transition-colors md:block md:after:block dark:after:border-zinc-600 dark:after:bg-zinc-800"
        dateTime={post.date}
      >
        {formatDate(post.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default async function Blog() {
  const posts = (await getAllPosts()).map(({ component: _, ...meta }) => meta)

  return (
    <SimpleLayout
      intro={metadata.description}
      title="Writing about software engineering and developer experience"
    >
      <div className="transition-colors md:border-l-2 md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {posts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
