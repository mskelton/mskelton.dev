import { MDXLayoutRenderer } from "components/MDXComponents"
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "lib/mdx"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"

export async function getStaticPaths() {
  const posts = await getFiles()

  return {
    fallback: false,
    paths: posts.map((p) => ({ params: { slug: formatSlug(p) } })),
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params!.slug
  const allPosts = await getAllFilesFrontMatter()
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
  const { frontMatter, mdxSource } = post

  return (
    <MDXLayoutRenderer
      authorDetails={authorDetails}
      frontMatter={frontMatter}
      layout="PostLayout"
      mdxSource={mdxSource}
      next={next}
      prev={prev}
    />
  )
}
