import Head from "next/head"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Link } from "../components/Link"
import { Paragraph } from "../components/Paragraph"
import { SocialLink } from "../components/SocialLink"

function Home() {
  return (
    <div>
      <Head>
        <title>Mark Skelton</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="py-16 px-20" data-testid="home">
        <h1 className="text-5xl mb-10">
          Hi, I&rsquo;m <span className="text-blue-400">Mark Skelton</span>.
        </h1>

        <Paragraph className="mb-4">
          I&rsquo;m a software developer and follower of Christ from Monroe,
          Wisconsin. Right now, I&rsquo;m working at{" "}
          <Link href="https://www.widen.com">Widen</Link> as a lead developer
          and JavaScript Engineer. TypeScript and React are my jam, plus a host
          of other technologies including Node, Playwright, webpack, Prettier,
          ESLint, and so much more.
        </Paragraph>

        <Paragraph className="mb-8">
          In my spare time, I enjoy spending time with friends, playing disc
          golf, coding (why not), and remodeling my house. I&rsquo;m both and
          extrovert and a nerd, so I&rsquo;m more than happy to talk for long
          periods of time with my family about tech, even if they don&rsquo;t
          understand.
        </Paragraph>

        <h2 className="text-4xl mb-2">Socials</h2>

        <Paragraph className="mb-6">
          If you want to get to know me better, check me out on any of my
          socials!
        </Paragraph>

        <div className="flex gap-4">
          <SocialLink
            href="https://github.com/mskelton"
            target="_blank"
            title="GitHub"
          >
            <FaGithub />
          </SocialLink>

          <SocialLink
            href="https://twitter.com/mskelton0"
            target="_blank"
            title="Twitter"
          >
            <FaTwitter />
          </SocialLink>

          <SocialLink
            href="https://linkedin.com/in/mark-skelton"
            target="_blank"
            title="Linkedin"
          >
            <FaLinkedin />
          </SocialLink>
        </div>
      </main>
    </div>
  )
}

export default Home
