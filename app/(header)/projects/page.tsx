import { Metadata } from "next"
import Image from "next/image"
import { Card } from "../../components/Card"
import { LinkIcon } from "../../components/icons"
import { SimpleLayout } from "../../components/layouts/SimpleLayout"
import { siteMeta } from "../../lib/siteMeta"
import logoSort from "./images/eslint-plugin-sort.svg"
import logoOneDark from "./images/one-dark.svg"
import logoPlaywright from "./images/playwright.png"
import logoRatchet from "./images/ratchet.svg"
import logoYarn from "./images/yarn.svg"

export const metadata: Metadata = {
  description: `I love creating software, especially when it makes the process of creating software more enjoyable. These are some of my more popular projects that I’m proud of.`,
  title: "Projects - Mark Skelton",
}

function gh(slug: string) {
  return {
    href: `https://github.com/${slug}`,
    label: "github.com",
  }
}

const projects = [
  {
    description: `The 2nd most popular JetBrains theme and the only project I created that someone else maintains.`,
    link: gh("one-dark/jetbrains-one-dark-theme"),
    logo: logoOneDark,
    name: "JetBrains One Dark Theme",
  },
  {
    description: `Yarn plugin to show outdated dependencies with way more features than anyone needs.`,
    link: gh("mskelton/yarn-plugin-outdated"),
    logo: logoYarn,
    name: "Yarn Outdated Plugin",
  },
  {
    description: `Automatically convert React PropTypes to TypeScript definitions.`,
    link: { href: `${siteMeta.url}/ratchet`, label: "mskelton.dev" },
    logo: logoRatchet,
    name: "Ratchet",
  },
  {
    description: `ESLint plugin for sorting imports, object properties, and more. Did I mention auto-fix that always works?`,
    link: {
      href: "https://www.npmjs.com/package/eslint-plugin-sort",
      label: "npmjs.com",
    },
    logo: logoSort,
    name: "ESLint Sort Plugin",
  },
  {
    description: `ESLint plugin for Playwright testing with lots of rules to help you enforce good testing practices.`,
    link: {
      href: "https://www.npmjs.com/package/eslint-plugin-playwright",
      label: "npmjs.com",
    },
    logo: logoPlaywright,
    name: "ESLint Playwright Plugin",
  },
]

export default function Projects() {
  return (
    <SimpleLayout
      intro={metadata.description}
      title="Things I’ve done to make software development just a little bit easier."
    >
      <ul
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {projects.map((project) => (
          <Card key={project.name} as="li">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                alt=""
                aria-hidden="true"
                className="h-8 w-8"
                src={project.logo}
                unoptimized
              />
            </div>

            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>

            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
