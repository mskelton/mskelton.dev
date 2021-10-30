import { InferGetStaticPropsType } from "next"
import { MDXLayoutRenderer } from "components/MDXComponents"
import { getFileBySlug } from "lib/mdx"

export async function getStaticProps() {
  const authorDetails = await getFileBySlug("authors", "mskelton")
  return { props: { authorDetails } }
}

export default function About({
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { frontMatter, mdxSource } = authorDetails

  return (
    <MDXLayoutRenderer
      frontMatter={frontMatter}
      layout={frontMatter.layout || "AuthorLayout"}
      mdxSource={mdxSource}
    />
  )
}
