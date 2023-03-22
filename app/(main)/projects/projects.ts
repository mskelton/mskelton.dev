import { siteMeta } from "../../lib/siteMeta"
import logoSort from "./images/eslint-plugin-sort.svg"
import logoOneDark from "./images/one-dark.svg"
import logoPlaywright from "./images/playwright.svg"
import logoRatchet from "./images/ratchet.svg"
import logoTermicons from "./images/termicons.svg"
import logoYarn from "./images/yarn.svg"

const gh = (slug: string) => `https://github.com/${slug}`
const mskelton = (slug: string) => `${siteMeta.url}/${slug}`
const npm = (name: string) => `https://www.npmjs.com/package/${name}`

export const projects = [
  {
    description: `The 2nd most popular JetBrains theme and the only project I created that someone else maintains.`,
    href: gh("one-dark/jetbrains-one-dark-theme"),
    logo: logoOneDark,
    name: "JetBrains One Dark Theme",
    shortName: "One Dark Theme",
  },
  {
    description: `Yarn plugin to show outdated dependencies with way more features than anyone needs.`,
    href: gh("mskelton/yarn-plugin-outdated"),
    logo: logoYarn,
    name: "Yarn Outdated Plugin",
    shortName: "Yarn Outdated",
  },
  {
    description: `ESLint plugin for sorting imports, object properties, and more. Did I mention auto-fix that always works?`,
    href: npm("eslint-plugin-sort"),
    logo: logoSort,
    name: "ESLint Sort Plugin",
    shortName: "ESLint Sort",
  },
  {
    description: `ESLint plugin for Playwright testing with lots of rules to help you enforce good testing practices.`,
    href: npm("eslint-plugin-playwright"),
    logo: logoPlaywright,
    name: "ESLint Playwright Plugin",
    shortName: "ESLint Playwright",
  },
  {
    description: `Material style icons built for terminal rendering and a Neovim companion plugin.`,
    href: mskelton("termicons"),
    logo: logoTermicons,
    name: "Termicons",
  },
  {
    description: `Automatically convert React PropTypes to TypeScript definitions.`,
    href: mskelton("ratchet"),
    logo: logoRatchet,
    name: "Ratchet",
  },
]
