import "./styles/tailwind.css"
import { Metadata } from "next"
import { Rubik } from "next/font/google"
import { siteMeta } from "./lib/siteMeta"
import { themeEffect } from "./lib/themeEffect"

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
      className={`pause-transitions h-full text-lg antialiased ${font.className}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <script
          dangerouslySetInnerHTML={{ __html: `(${themeEffect.toString()})();` }}
        />
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

      <body className="relative flex min-h-full flex-col bg-white transition-colors duration-300 dark:bg-zinc-900">
        {children}
      </body>
    </html>
  )
}
