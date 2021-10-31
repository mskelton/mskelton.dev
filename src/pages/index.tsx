import { InferGetStaticPropsType } from "next"
import Link from "components/Link"
import { PageSEO } from "components/SEO"
import Tag from "components/Tag"
import metadata from "data/metadata"
import { getAllFilesFrontMatter } from "lib/mdx"
import formatDate from "lib/utils/formatDate"

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter()
  return { props: { posts } }
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO description={metadata.description} title={metadata.title} />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Posts
          </h1>

          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Check out some of my recent blog posts.
          </p>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && <p className="py-4">No posts found.</p>}

          {posts
            .slice(0, MAX_DISPLAY)
            .map(({ date, slug, summary, tags, title }) => (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>

                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              className="text-gray-900 dark:text-gray-100"
                              href={`/blog/${slug}`}
                            >
                              {title}
                            </Link>
                          </h2>

                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </div>
                        </div>

                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>

                      <div className="text-base font-medium leading-6">
                        <Link
                          aria-label={`Read "${title}"`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          href={`/blog/${slug}`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            aria-label="all posts"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            href="/blog"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
