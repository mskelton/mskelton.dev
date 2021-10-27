import { InferGetStaticPropsType } from "next"
import Head from "next/head"
import React from "react"
import { Paragraph } from "components/Paragraph"
import { BlogPostCard } from "components/blog/BlogPostCard"
import { BlogPostGrid } from "components/blog/BlogPostGrid"
import { getPosts } from "lib/posts"

export async function getStaticProps() {
  const posts = await getPosts()
  return { props: { posts } }
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Mark Skelton&rsquo;s Blog</title>
      </Head>

      <main className="max-w-3xl mx-auto" data-testid="home">
        <h1 className="text-4xl mb-6">Blog</h1>

        <Paragraph className="mb-6">
          Thanks for checking out my blog, I hope you enjoy what you read!
        </Paragraph>

        <BlogPostGrid>
          {posts.map((post) => (
            <BlogPostCard key={post.slug} {...post} />
          ))}
        </BlogPostGrid>
      </main>
    </div>
  )
}
