import { MetaFunction, useLoaderData } from "remix"
import { MDXRenderer } from "~/components/MDXRenderer"
import metadata from "~/data/metadata"
import AuthorLayout from "~/layouts/AboutLayout"
import { InferLoaderData } from "~/types/remix"
import { getFileBySlug } from "~/utils/mdx.server"
import { seo } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return seo({
    description: metadata.description,
    title: "About Me",
  })
}

export async function loader() {
  return getFileBySlug("authors", "mskelton")
}

export default function About() {
  const data = useLoaderData<InferLoaderData<typeof loader>>()

  return (
    <div data-testid="about">
      <MDXRenderer layout={AuthorLayout} {...data} />
    </div>
  )
}
