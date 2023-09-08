import { NavItem } from "./NavItem"

export function DesktopNavigation(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav {...props}>
      <ul className="flex gap-1 rounded-full text-sm font-medium text-zinc-800 transition-colors dark:text-zinc-200">
        <NavItem href="/blog">Blog</NavItem>
        {/* <NavItem href="/bytes">Bytes</NavItem> */}
        <NavItem href="/about">About</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/uses">Uses</NavItem>
      </ul>
    </nav>
  )
}
