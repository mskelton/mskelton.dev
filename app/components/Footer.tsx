import { Link } from "~/components/Link"
import SocialLink from "~/components/SocialLink"
import metadata from "~/data/metadata"

export function Footer() {
  return (
    <footer className="text-muted mt-16 flex flex-col items-center text-sm">
      <div className="mb-3 flex space-x-4">
        <SocialLink href={metadata.github} kind="github" />
        <SocialLink href={metadata.twitter.url} kind="twitter" />
        <SocialLink href={metadata.linkedin} kind="linkedin" />
        <SocialLink href={`mailto:${metadata.email}`} kind="mail" />
      </div>

      <div className="mb-2 flex space-x-2">
        <span>{`© ${new Date().getFullYear()}`}</span>
        <span>{` • `}</span>
        <span>Mark Skelton</span>
      </div>

      <div className="mb-8">
        Built using{" "}
        <Link
          className="link-secondary"
          href="https://github.com/remix-run/remix"
        >
          Remix
        </Link>
      </div>
    </footer>
  )
}
