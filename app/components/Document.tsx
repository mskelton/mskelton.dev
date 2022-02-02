import { Links, LiveReload, Meta, Scripts } from "remix"
import type { Theme } from "../utils/theme.server"
// import { Analytics } from "./Analytics"
import { LayoutWrapper } from "./LayoutWrapper"

interface DocumentProps {
  children: React.ReactNode
  theme: Theme
  title?: string
}

export function Document({ children, theme, title }: DocumentProps) {
  return (
    <html className={theme} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
        {/* <Analytics /> */}
      </head>

      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
