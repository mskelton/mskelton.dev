import { getMDXComponent } from "mdx-bundler/client"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { useMemo } from "react"
import { Link } from "components/Link"
import { MarkdownImage } from "components/MarkdownImage"
import {
  MarkdownH2,
  MarkdownH3,
  MarkdownOrderedList,
  MarkdownParagraph,
  MarkdownUnorderedList,
} from "components/markdown"
import { getPostBySlug, getPosts } from "lib/posts"
import { AllowableAny } from "utils/types"

export async function getStaticPaths() {
  const posts = await getPosts(undefined)

  return {
    fallback: false,
    paths: posts.map(({ slug }) => ({ params: { slug } })),
  }
}

type Context = GetStaticPropsContext<{ slug: string }>

export async function getStaticProps(context: Context) {
  const slug = context.params!.slug
  const post = await getPostBySlug(slug)

  return { props: { ...post, slug } }
}

function Post({
  code,
  frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <main>
      <h1 className="text-4xl mb-10">{frontmatter.title}</h1>
      <article className="markdown max-w-prose">
        <Component
          components={{
            a: Link,
            h2: MarkdownH2,
            h3: MarkdownH3,
            img: MarkdownImage as AllowableAny,
            ol: MarkdownOrderedList,
            p: MarkdownParagraph,
            ul: MarkdownUnorderedList,
          }}
        />
      </article>
    </main>
  )
}

export default Post
