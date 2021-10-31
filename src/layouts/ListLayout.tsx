import React, { ComponentProps, useState } from "react"
import { FiSearch } from "react-icons/fi"
import Link from "components/Link"
import Pagination from "components/Pagination"
import Tag from "components/Tag"
import formatDate from "lib/utils/formatDate"
import { PostFrontMatter } from "types/FrontMatter"

interface ListLayoutProps {
  posts: PostFrontMatter[]
  title: string
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
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
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>

          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              type="text"
            />

            <FiSearch
              className="absolute text-gray-400 right-3 top-3 dark:text-gray-300"
              size={18}
            />
          </div>
        </div>

        <ul>
          {!filteredBlogPosts.length && <p className="py-4">No posts found.</p>}

          {displayPosts.map(({ date, slug, summary, tags, title }) => (
            <li key={slug} className="py-4">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </dl>

                <div className="space-y-3 xl:col-span-3">
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