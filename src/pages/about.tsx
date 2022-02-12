import { InferGetStaticPropsType } from "next"
import { MDXLayoutRenderer } from "components/MDXComponents"
import { getFileBySlug } from "lib/mdx"

export async function getStaticProps() {
  const authorDetails = await getFileBySlug("pages", "about")
  return { props: { authorDetails } }
}

export default function About({
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { frontMatter, mdxSource } = authorDetails

  return (
    <div data-testid="about">
      <MDXLayoutRenderer
        frontMatter={frontMatter}
        layout="AboutLayout"
        mdxSource={mdxSource}
      />
    </div>
  )
}
