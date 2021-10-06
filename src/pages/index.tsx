import { InferGetStaticPropsType } from "next"
import Head from "next/head"
import React from "react"
import { BlogPostCard } from "../components/blog/BlogPostCard"
import { BlogPostRow } from "../components/blog/BlogPostRow"
import { getPosts } from "../lib/posts"

export async function getStaticProps() {
  const posts = await getPosts(3, ["title", "slug", "excerpt"])

  return { props: { posts } }
}

function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Mark Skelton</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main data-testid="home">
        <h1>Hi, I&rsquo;m Mark Skelton.</h1>

        <p>
          I&rsquo;m a software developer and follower of Christ from Monroe,
          Wisconsin.
        </p>

        <h2>Recent blogs posts</h2>
        <BlogPostRow>
          {posts.map((post) => (
            <BlogPostCard key={post.slug} {...post} />
          ))}
        </BlogPostRow>
      </main>
    </div>
  )
}

export default Home
