import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa"

const components = {
  facebook: FaFacebook,
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: FaEnvelope,
  twitter: FaTwitter,
}

interface SocialIconProps {
  href: string
  kind: keyof typeof components
}

export default function SocialIcon({ href, kind }: SocialIconProps) {
  const Component = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">{kind}</span>
      <Component className="fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-8 w-8" />
    </a>
  )
}
