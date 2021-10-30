import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { MDXLayoutRenderer } from "components/MDXComponents"
import PageTitle from "components/PageTitle"
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "lib/mdx"

const DEFAULT_LAYOUT = "PostLayout"

export async function getStaticPaths() {
  const posts = getFiles("blog")
  return {
    fallback: false,
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params!.slug
  const allPosts = await getAllFilesFrontMatter("blog")
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === slug)

  const post = await getFileBySlug("blog", slug)
  const authorList = post.frontMatter.authors || ["mskelton"]
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug("authors", [author])
    return authorResults.frontMatter
  })

  // rss
  // const rss = generateRss(allPosts)
  // fs.writeFileSync("./public/feed.xml", rss)

  return {
    props: {
      authorDetails: await Promise.all(authorPromise),
      next: allPosts[postIndex - 1] || null,
      post,
      prev: allPosts[postIndex + 1] || null,
    },
  }
}

export default function Blog({
  authorDetails,
  next,
  post,
  prev,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { frontMatter, mdxSource, toc } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          authorDetails={authorDetails}
          frontMatter={frontMatter}
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          next={next}
          prev={prev}
          toc={toc}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span aria-label="roadwork sign" role="img">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
