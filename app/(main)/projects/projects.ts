import { siteMeta } from "../../lib/siteMeta"
import logoSort from "./images/eslint-plugin-sort.svg"
import logoOneDark from "./images/one-dark.svg"
import logoPlaywright from "./images/playwright.svg"
import logoRatchet from "./images/ratchet.svg"
import logoTermicons from "./images/termicons.svg"
import logoYarn from "./images/yarn.svg"

const gh = (slug: string) => ({
  href: `https://github.com/${slug}`,
  label: "github.com",
})

const mskelton = (slug: string) => ({
  href: `${siteMeta.url}/${slug}`,
  label: "mskelton.dev",
})

const npm = (name: string) => ({
  href: `https://www.npmjs.com/package/${name}`,
  label: "npmjs.com",
})

export const projects = [
  {
    description: `The 2nd most popular JetBrains theme and the only project I created that someone else maintains.`,
    link: gh("one-dark/jetbrains-one-dark-theme"),
    logo: logoOneDark,
    name: "JetBrains One Dark Theme",
    shortName: "One Dark Theme",
  },
  {
    description: `Yarn plugin to show outdated dependencies with way more features than anyone needs.`,
    link: gh("mskelton/yarn-plugin-outdated"),
    logo: logoYarn,
    name: "Yarn Outdated Plugin",
    shortName: "Yarn Outdated",
  },
  {
    description: `ESLint plugin for sorting imports, object properties, and more. Did I mention auto-fix that always works?`,
    link: npm("eslint-plugin-sort"),
    logo: logoSort,
    name: "ESLint Sort Plugin",
    shortName: "ESLint Sort",
  },
  {
    description: `ESLint plugin for Playwright testing with lots of rules to help you enforce good testing practices.`,
    link: npm("eslint-plugin-playwright"),
    logo: logoPlaywright,
    name: "ESLint Playwright Plugin",
    shortName: "ESLint Playwright",
  },
  {
    description: `Material style icons built for terminal rendering and a Neovim companion plugin.`,
    link: mskelton("termicons"),
    logo: logoTermicons,
    name: "Termicons",
  },
  {
    description: `Automatically convert React PropTypes to TypeScript definitions.`,
    link: mskelton("ratchet"),
    logo: logoRatchet,
    name: "Ratchet",
  },
]
