import { MetaFunction } from "remix"
import Component, { attributes } from "~/data/about.md"
import metadata from "~/data/metadata"
import { seo } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return seo({
    description: metadata.description,
    title: "About Me",
  })
}

export default function About() {
  return (
    <div data-testid="about">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>

        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <img
              alt="avatar"
              className="h-48 w-48 rounded-full"
              src="/images/me.jpg"
            />

            <h2 className="pt-4 pb-2 text-2xl font-bold leading-8">
              Mark Skelton
            </h2>

            <p className="text-muted text-sm">
              {attributes.occupation} at {attributes.company}
            </p>
          </div>

          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
            <Component />
          </div>
        </div>
      </div>
    </div>
  )
}
