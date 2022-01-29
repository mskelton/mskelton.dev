import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

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
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      data-testid="social-link"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">{kind}</span>
      <Component className="h-8 w-8 fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400" />
    </a>
  )
}
