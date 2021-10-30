import { MDXLayoutRenderer } from "components/MDXComponents"
import { getFileBySlug } from "lib/mdx"

const DEFAULT_LAYOUT = "AuthorLayout"

export async function getStaticProps() {
  const authorDetails = await getFileBySlug("authors", "mskelton")
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { frontMatter, mdxSource } = authorDetails

  return (
    <MDXLayoutRenderer
      frontMatter={frontMatter}
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
    />
  )
}
