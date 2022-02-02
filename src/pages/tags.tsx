import { InferGetStaticPropsType } from "next"
import { PageSEO } from "~/components/SEO"
import Tag from "~/components/Tag"
import metadata from "~/data/metadata"
import { getAllTags } from "~/lib/tags"

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
        className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0"
        data-testid="tags"
      >
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 text-gray-900 dark:border-gray-700 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>

        <div className="flex max-w-lg flex-wrap">
          {sortedTags.map((tag) => (
            <div key={tag} className="mt-2 mb-2 mr-5">
              <Tag>{tag}</Tag>
              <span className="-ml-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                ({tags[tag]})
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
