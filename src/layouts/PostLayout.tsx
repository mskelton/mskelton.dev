import React, { ReactNode } from "react"
import { Link } from "components/Link"
import { PageTitle } from "components/PageTitle"
import ScrollTop from "components/ScrollTop"
import SectionContainer from "components/SectionContainer"
import { BlogSEO } from "components/SEO"
import metadata from "data/metadata"
import { PostFrontMatter } from "types/FrontMatter"

const editUrl = (fileName: string) =>
  `${metadata.siteRepo}/blob/main/src/data/blog/${fileName}`

function shareUrl(slug: string, title: string) {
  const url = encodeURIComponent(`${metadata.siteUrl}/blog/${slug}`)
  const text = encodeURIComponent(
    `Just finished reading "${title}" by @mskelton0.`
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
}

export default function PostLayout({ children, frontMatter }: PostLayoutProps) {
  const { date, fileName, slug, title } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${metadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <ScrollTop />

      <article className="mx-auto max-w-4xl divide-y divide-gray-200 dark:divide-gray-700">
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

        <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
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
        </div>
      </article>
    </SectionContainer>
  )
}
