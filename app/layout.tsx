import "./styles/tailwind.css"
import { Metadata } from "next"
import { Rubik } from "next/font/google"
import { AnalyticsWrapper } from "./components/root/AnalyticsWrapper"
import { siteMeta } from "./lib/siteMeta"
import ThemeScript from "./ThemeScript"

export const metadata: Metadata = {
  description: siteMeta.description,
  title: `Mark Skelton - ${siteMeta.tagline}`,
}

const font = Rubik({
  display: "fallback",
  fallback: ["sans-serif"],
  subsets: ["latin"],
})

export interface RootLayoutProps {
  children?: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={`h-full text-lg antialiased ${font.className}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
        <link
          href={`${siteMeta.url}/rss/feed.xml`}
          rel="alternate"
          type="application/rss+xml"
        />
        <link
          href={`${siteMeta.url}/rss/feed.json`}
          rel="alternate"
          type="application/feed+json"
        />
      </head>

      <body className="flex min-h-fit flex-col bg-white transition-colors duration-300 dark:bg-zinc-900 relative">
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
