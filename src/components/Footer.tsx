import SocialIcon from "components/SocialIcon"
import metadata from "data/metadata"
import Link from "./Link"

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4">
          <SocialIcon href={`mailto:${metadata.email}`} kind="mail" />
          <SocialIcon href={metadata.github} kind="github" />
          <SocialIcon href={metadata.facebook} kind="facebook" />
          <SocialIcon href={metadata.linkedin} kind="linkedin" />
          <SocialIcon href={metadata.twitter} kind="twitter" />
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
