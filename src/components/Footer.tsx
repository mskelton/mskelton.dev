import SocialIcon from "components/social-icons"
import siteMetadata from "data/siteMetadata"
import Link from "./Link"

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4">
          <SocialIcon
            href={`mailto:${siteMetadata.email}`}
            kind="mail"
            size="6"
          />
          <SocialIcon href={siteMetadata.github} kind="github" size="6" />
          <SocialIcon href={siteMetadata.facebook} kind="facebook" size="6" />
          <SocialIcon href={siteMetadata.youtube} kind="youtube" size="6" />
          <SocialIcon href={siteMetadata.linkedin} kind="linkedin" size="6" />
          <SocialIcon href={siteMetadata.twitter} kind="twitter" size="6" />
        </div>
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
