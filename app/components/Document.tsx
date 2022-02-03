import { Links, LiveReload, Meta, Scripts } from "remix"
import { LayoutWrapper } from "~/components/LayoutWrapper"
import type { Theme } from "~/utils/theme.server"

interface DocumentProps {
  children: React.ReactNode
  theme: Theme
  title?: string
}

export function Document({ children, theme, title }: DocumentProps) {
  return (
    <html className={theme} lang="en">
      <head>
        <Meta />
        {title && <title>{title}</title>}
        <Links />
      </head>

      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
