import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Link } from "~/components/Link"

const components = {
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: FaEnvelope,
  twitter: FaTwitter,
}

interface SocialLinkProps {
  href: string
  kind: keyof typeof components
}

export default function SocialLink({ href, kind }: SocialLinkProps) {
  const Component = components[kind]

  return (
    <Link
      aria-label={kind}
      className="link-secondary"
      data-testid="social-link"
      href={href}
    >
      <Component className="h-8 w-8" />
    </Link>
  )
}
