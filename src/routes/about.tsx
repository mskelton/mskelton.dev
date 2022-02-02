import { LoaderFunction } from "remix"
import { MDXLayoutRenderer } from "~/components/MDXComponents"
import { getFileBySlug } from "~/lib/mdx.server"

export const loader: LoaderFunction = async () => {
  return {
    authorDetails: await getFileBySlug("authors", "mskelton"),
  }
}

export default function About() {
  const { frontMatter, mdxSource } = authorDetails

  return (
    <div data-testid="about">
      <MDXLayoutRenderer
        frontMatter={frontMatter}
        layout="AuthorLayout"
        mdxSource={mdxSource}
      />
    </div>
  )
}
