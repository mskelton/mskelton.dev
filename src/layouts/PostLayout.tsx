import Image from "next/image"
import React, { ReactNode } from "react"
import Link from "components/Link"
import PageTitle from "components/PageTitle"
import { BlogSEO } from "components/SEO"
import ScrollTopAndComment from "components/ScrollTopAndComment"
import SectionContainer from "components/SectionContainer"
import Tag from "components/Tag"
import siteMetadata from "data/siteMetadata"
import { AuthorFrontMatter, PostFrontMatter } from "types/FrontMatter"

const editUrl = (fileName: string) =>
  `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`

function shareUrl(slug: string, title: string, author: string) {
  const url = encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)
  const text = encodeURIComponent(
    `Just finished reading "${title}" by ${author}.`
  )

  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`
}

const postDateTemplate: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
}

interface PostLayoutProps {
  authorDetails: AuthorFrontMatter[]
  children: ReactNode
  frontMatter: PostFrontMatter
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

export default function PostLayout({
  authorDetails,
  children,
  frontMatter,
  next,
  prev,
}: PostLayoutProps) {
  const { date, fileName, slug, tags, title } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        authorDetails={authorDetails}
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        {...frontMatter}
      />

      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>

              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li
                      key={author.name}
                      className="flex items-center space-x-2"
                    >
                      {author.avatar && (
                        <Image
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                          height="38px"
                          src={require(`../images/authors/${author.avatar}`)}
                          width="38px"
                        />
                      )}
                      <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {author.name}
                        </dd>

                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              href={author.twitter.replace(
                                "@",
                                "https://twitter.com/"
                              )}
                            >
                              {author.twitter}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
                {children}
              </div>

              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link
                  href={shareUrl(slug, title, authorDetails[0].twitter)}
                  rel="nofollow"
                >
                  Share on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{"View on GitHub"}</Link>
              </div>
            </div>

            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>

                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                )}

                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Article
                        </h2>

                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}

                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>

                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 xl:pt-8">
                <Link
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  href="/blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
