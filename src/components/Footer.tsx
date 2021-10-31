import SocialLink from "components/SocialLink"
import metadata from "data/metadata"
import Link from "./Link"

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4">
          <SocialLink href={metadata.github} kind="github" />
          <SocialLink href={metadata.twitter} kind="twitter" />
          <SocialLink href={metadata.linkedin} kind="linkedin" />
          <SocialLink href={`mailto:${metadata.email}`} kind="mail" />
        </div>

        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{`© ${new Date().getFullYear()}`}</span>
          <span>{` • `}</span>
          <span>{metadata.author}</span>
        </div>

        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Built using{" "}
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Next.js Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}