import { InferGetStaticPropsType } from "next"
import Head from "next/head"
import React from "react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Anchor } from "components/Anchor"
import { Paragraph } from "components/Paragraph"
import { SocialLink } from "components/SocialLink"
import { BlogPostCard } from "components/blog/BlogPostCard"
import { BlogPostGrid } from "components/blog/BlogPostGrid"
import { getPosts } from "lib/posts"

export async function getStaticProps() {
  const posts = await getPosts(4)
  return { props: { posts } }
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Mark Skelton</title>
      </Head>

      <main className="max-w-3xl mx-auto" data-testid="home">
        <h1 className="text-5xl mb-10">
          Hi, I&rsquo;m <span className="text-blue-400">Mark Skelton</span>.
        </h1>

        <Paragraph className="mb-4">
          I&rsquo;m a software developer and follower of Christ from Monroe,
          Wisconsin. Right now, I&rsquo;m working at{" "}
          <Anchor href="https://www.widen.com">Widen</Anchor> as a lead
          developer and JavaScript Engineer. TypeScript and React are my jam,
          plus a host of other technologies including Node, Playwright, webpack,
          Prettier, ESLint, and so much more.
        </Paragraph>

        <Paragraph className="mb-8">
          In my spare time, I enjoy spending time with friends, playing disc
          golf, coding (why not), and remodeling my house. I&rsquo;m both and
          extrovert and a nerd, so I&rsquo;m more than happy to talk for long
          periods of time with my family about tech, even if they don&rsquo;t
          understand.
        </Paragraph>

        <h2 className="text-4xl mb-2">Blog</h2>
        <Paragraph className="mb-6">
          From time to time, I enjoy writing about what I am learning or working
          on. Check out some of my latest blog posts if you are interested!
        </Paragraph>

        <div className="mb-8">
          <BlogPostGrid>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} {...post} />
            ))}
          </BlogPostGrid>
        </div>

        <h2 className="text-4xl mb-2">Socials</h2>
        <Paragraph className="mb-6">
          If you want to get to know me better, check me out on any of my
          socials!
        </Paragraph>

        <div className="flex gap-4">
          <SocialLink href="https://github.com/mskelton" title="GitHub">
            <FaGithub />
          </SocialLink>

          <SocialLink href="https://twitter.com/mskelton0" title="Twitter">
            <FaTwitter />
          </SocialLink>

          <SocialLink href="https://linkedin.com/in/mskelton0" title="Linkedin">
            <FaLinkedin />
          </SocialLink>
        </div>
      </main>
    </div>
  )
}
