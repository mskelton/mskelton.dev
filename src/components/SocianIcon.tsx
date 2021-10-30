import Facebook from "./facebook.svg"
import Github from "./github.svg"
import Linkedin from "./linkedin.svg"
import Mail from "./mail.svg"
import Twitter from "./twitter.svg"
import Youtube from "./youtube.svg"

// Icons taken from: https://simpleicons.org/

const components = {
  facebook: Facebook,
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  youtube: Youtube,
}

export default function SocialIcon({ href, kind, size = 8 }) {
  if (
    !href ||
    (kind === "mail" &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </a>
  )
}
