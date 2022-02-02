import { LoaderFunction, useLoaderData } from "remix"
import formatDate from "~/utils/formatDate"
import { Link } from "../components/Link"
import { TagList } from "../components/TagList"
import { PostFrontMatter } from "../types/FrontMatter"

const MAX_DISPLAY = 5

interface LoaderData {
  posts: PostFrontMatter[]
}

export const loader: LoaderFunction = async () => {
  return {
    // posts: await getAllFilesFrontMatter(),
    posts: [],
  }
}

export default function Home() {
  const { posts } = useLoaderData<LoaderData>()

  return (
    <>
      {/* <PageSEO description={metadata.description} title={metadata.title} /> */}

      <div
        className="divide-y divide-gray-200 dark:divide-gray-700"
        data-testid="home"
      >
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Posts
          </h1>

          <p className="text-muted text-lg leading-7">
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
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-muted text-base font-medium leading-6">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>

                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8">
                            <Link
                              className="link-secondary"
                              href={`/blog/${slug}`}
                            >
                              {title}
                            </Link>
                          </h2>

                          <TagList tags={tags} />
                        </div>

                        <div className="text-muted prose max-w-none">
                          {summary}
                        </div>
                      </div>

                      <div className="text-base font-medium leading-6">
                        <Link
                          aria-label={`Read "${title}"`}
                          className="link-primary"
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
          <Link aria-label="all posts" className="link-primary" href="/blog">
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
