import { getMDXComponent } from "mdx-bundler/client"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import Head from "next/head"
import Link from "next/link"
import { useMemo } from "react"
import { FaChevronLeft } from "react-icons/fa"
import { Anchor } from "components/Anchor"
import {
  MarkdownBlockquote,
  MarkdownH2,
  MarkdownH3,
  MarkdownImage,
  MarkdownLink,
  MarkdownOrderedList,
  MarkdownParagraph,
  MarkdownUnorderedList,
} from "components/markdown"
import { getPostBySlug, getPostSlugs } from "lib/posts"
import { AllowableAny } from "utils/types"

export async function getStaticPaths() {
  const slugs = await getPostSlugs()

  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const slug = context.params!.slug
  const post = await getPostBySlug(slug)

  return { props: { ...post, slug } }
}

export default function Post({
  code,
  frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta content={frontmatter.excerpt} name="description" />
        <meta content={frontmatter.tags} name="keywords" />
      </Head>

      <main className="max-w-prose mx-auto">
        <Link href="/" passHref>
          <Anchor className="inline-flex items-center mb-5">
            <FaChevronLeft className="mr-1 text-sm" /> Back to home
          </Anchor>
        </Link>

        <h1 className="text-4xl mb-10">{frontmatter.title}</h1>
        <article className="markdown">
          <Component
            components={{
              a: MarkdownLink as AllowableAny,
              blockquote: MarkdownBlockquote,
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
    </>
  )
}
