import SocialLink from "components/SocialLink"
import metadata from "data/metadata"
import { Link } from "./Link"

export function Footer() {
  return (
    <footer className="text-muted mt-16 flex flex-col items-center text-sm">
      <div className="mb-3 flex space-x-4">
        <SocialLink href={metadata.github} kind="github" />
        <SocialLink href={metadata.twitter} kind="twitter" />
        <SocialLink href={metadata.linkedin} kind="linkedin" />
        <SocialLink href={`mailto:${metadata.email}`} kind="mail" />
      </div>

      <div className="mb-2 flex space-x-2">
        <span>{`© ${new Date().getFullYear()}`}</span>
        <span>{` • `}</span>
        <span>{metadata.author}</span>
      </div>

      <div className="mb-8">
        Built using{" "}
        <Link
          className="link-secondary"
          href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
        >
          Tailwind Next.js Theme
        </Link>
      </div>
    </footer>
  )
}
