import React, { ComponentProps, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { CustomLink as Link } from "components/Link"
import { Pagination } from "components/Pagination"
import { TagList } from "components/TagList"
import formatDate from "lib/utils/formatDate"
import { PostFrontMatter } from "types/FrontMatter"

interface ListLayoutProps {
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
  posts: PostFrontMatter[]
  title: string
}

export default function ListLayout({
  initialDisplayPosts = [],
  pagination,
  posts,
  title,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState("")
  const filteredBlogPosts = posts.filter((frontMatter) => {
    return [frontMatter.title, frontMatter.summary, ...frontMatter.tags]
      .join(" ")
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>

          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary-500"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              type="text"
            />

            <FiSearch
              className="absolute right-3 top-3 text-gray-400 dark:text-gray-300"
              size={18}
            />
          </div>
        </div>

        <ul>
          {!filteredBlogPosts.length && <p className="py-4">No posts found.</p>}

          {displayPosts.map(({ date, slug, summary, tags, title }) => (
            <li key={slug} className="py-4">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-muted text-base font-medium leading-6">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </dl>

                <div className="space-y-3 xl:col-span-3">
                  <div>
                    <h2 className="text-2xl font-bold leading-8">
                      <Link className="text" href={`/blog/${slug}`}>
                        {title}
                      </Link>
                    </h2>

                    <TagList tags={tags} />
                  </div>

                  <div className="text-muted prose max-w-none">{summary}</div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  )
}
