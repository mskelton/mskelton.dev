import { Route } from "next"

interface NavItem {
  href: Route
  label: string
}

export const navItems: NavItem[] = [
  { href: "/blog", label: "Blog" },
  // { href: "/bytes", label: "Bytes" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/uses", label: "Uses" },
]
