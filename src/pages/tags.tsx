import { InferGetStaticPropsType } from "next"
import slugify from "slugify"
import Link from "components/Link"
import { PageSEO } from "components/SEO"
import Tag from "components/Tag"
import metadata from "data/metadata"
import { getAllTags } from "lib/tags"

export async function getStaticProps() {
  const tags = await getAllTags()
  return { props: { tags } }
}

export default function Tags({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

  return (
    <>
      <PageSEO
        description="Things I blog about"
        title={`Tags - ${metadata.author}`}
      />

      <div
        className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24"
        data-testid="tags"
      >
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 dark:border-gray-700 md:px-6">
            Tags
          </h1>
        </div>

        <div className="flex flex-wrap max-w-lg">
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag>{t}</Tag>
                <Link
                  className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  href={`/tags/${slugify(t)}`}
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
