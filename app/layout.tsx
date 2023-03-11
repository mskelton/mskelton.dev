import "./styles/tailwind.css"
import { Rubik } from "@next/font/google"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { AnalyticsWrapper } from "./components/root/AnalyticsWrapper"
import { Footer } from "./components/root/Footer"
import { siteMeta } from "./lib/siteMeta"

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
  const cookieStore = cookies()
  const theme = cookieStore.get("theme")?.value ?? "dark"

  return (
    <html
      className={`h-full text-lg antialiased ${theme} ${font.className}`}
      lang="en"
    >
      <head>
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

      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>

        <div className="relative">
          {children}
          <Footer />
        </div>

        <AnalyticsWrapper />
      </body>
    </html>
  )
}
