import { Links, LiveReload, Meta, Scripts } from "remix"
import { LayoutWrapper } from "~/components/LayoutWrapper"
import { useTheme } from "~/components/ThemeProvider"

interface DocumentProps {
  children: React.ReactNode
  title?: string
}

export function Document({ children, title }: DocumentProps) {
  const { theme } = useTheme()

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
