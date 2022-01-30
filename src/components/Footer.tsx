import SocialLink from "components/SocialLink"
import metadata from "data/metadata"
import { Link } from "./Link"

export function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialLink href={metadata.github} kind="github" />
          <SocialLink href={metadata.twitter} kind="twitter" />
          <SocialLink href={metadata.linkedin} kind="linkedin" />
          <SocialLink href={`mailto:${metadata.email}`} kind="mail" />
        </div>

        <div className="text-muted mb-2 flex space-x-2 text-sm">
          <span>{`© ${new Date().getFullYear()}`}</span>
          <span>{` • `}</span>
          <span>{metadata.author}</span>
        </div>

        <div className="text-muted mb-8 text-sm">
          Built using{" "}
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Next.js Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
