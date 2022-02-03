import React, { ReactNode } from "react"
import { Link } from "~/components/Link"
import { PageTitle } from "~/components/PageTitle"
import { PostPaginationLink } from "~/components/PostPaginationLink"
import ScrollTop from "~/components/ScrollTop"
import SectionContainer from "~/components/SectionContainer"
import { TagList } from "~/components/TagList"
import metadata from "~/data/metadata"
import { PostFrontMatter } from "~/types/FrontMatter"

const editUrl = (fileName: string) =>
  `${metadata.siteRepo}/blob/main/app/data/blog/${fileName}`

function shareUrl(slug: string, title: string) {
  const url = encodeURIComponent(`${metadata.siteUrl}/blog/${slug}`)
  const text = encodeURIComponent(
    `Just finished reading "${title}" by @mskelton.`
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
  children: ReactNode
  frontMatter: PostFrontMatter
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

export default function PostLayout({
  children,
  frontMatter,
  next,
  prev,
}: PostLayoutProps) {
  const { date, fileName, slug, tags, title } = frontMatter

  return (
    <SectionContainer>
      <ScrollTop />

      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="py-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-muted text-base font-medium leading-6">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        undefined,
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
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <div />
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 prose-headings:-ml-6 prose-headings:pl-6 prose-h2:mt-5 prose-h2:pt-3 prose-h3:mt-4  prose-h3:pt-2 prose-a:whitespace-nowrap prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-800 dark:prose-dark">
                {children}
              </div>

              <div className="flex space-x-2 pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link
                  className="link-primary"
                  href={shareUrl(slug, title)}
                  rel="nofollow"
                >
                  Share on Twitter
                </Link>
                <span>&bull;</span>
                <Link className="link-primary" href={editUrl(fileName)}>
                  View on GitHub
                </Link>
              </div>
            </div>

            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-muted text-xs uppercase">Tags</h2>
                    <TagList tags={tags} />
                  </div>
                )}

                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    <PostPaginationLink link={prev}>
                      Previous Article
                    </PostPaginationLink>

                    <PostPaginationLink link={next}>
                      Next Article
                    </PostPaginationLink>
                  </div>
                )}
              </div>

              <Link
                className="link-primary inline-block pt-4 xl:pt-8"
                href="/blog"
              >
                &larr; Back to the blog
              </Link>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
