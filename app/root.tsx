import { DataFunctionArgs } from "@remix-run/server-runtime"
import {
  LinksFunction,
  MetaFunction,
  Outlet,
  useCatch,
  useLoaderData,
} from "remix"
import { Document } from "~/components/Document"
import { NotFound } from "~/components/NotFound"
import { ThemeProvider } from "~/components/ThemeProvider"
import metadata from "~/data/metadata"
import stylesUrl from "~/tailwind.css"
import { getTheme, Theme } from "~/utils/theme.server"

export const links: LinksFunction = () => {
  return [
    {
      crossOrigin: "anonymous",
      href: "https://fonts.gstatic.com",
      rel: "preconnect",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
      rel: "stylesheet",
    },
    {
      href: stylesUrl,
      rel: "stylesheet",
    },
    // {
    //   href: "/feed.xml",
    //   rel: "alternate",
    //   type: "application/rss+xml",
    // },
  ]
}

export const meta: MetaFunction = ({ location }) => {
  const image = metadata.siteUrl + metadata.siteLogo

  return {
    charset: "utf-8",
    "og:image": image,
    "og:site_name": metadata.title,
    "og:type": "website",
    "og:url": metadata.siteUrl + location.pathname,
    robots: "follow, index",
    "twitter:card": "summary",
    "twitter:image": image,
    "twitter:site": metadata.twitter.handle,
    viewport: "width=device-width, initial-scale=1",
  }
}

export async function loader({ request }: DataFunctionArgs) {
  return {
    theme: await getTheme(request),
  }
}

export function CatchBoundary() {
  const { status } = useCatch()

  switch (status) {
    case 404:
      return <NotFound />

    default:
      throw new Error(`Unexpected caught response with status: ${status}`)
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  )
}

export default function App() {
  const { theme } = useLoaderData<{ theme: Theme }>()

  return (
    <ThemeProvider initialTheme={theme}>
      <Document>
        <Outlet />
      </Document>
    </ThemeProvider>
  )
}
