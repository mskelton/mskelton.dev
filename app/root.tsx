import { LinksFunction, LoaderFunction, Scripts } from "remix"
import { Outlet, useCatch, useLoaderData } from "remix"
import stylesUrl from "~/tailwind.css"
import { Document } from "./components/Document"
import { NotFound } from "./components/NotFound"
import { getTheme } from "./utils/theme.server"

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
    {
      href: "/feed.xml",
      rel: "alternate",
      type: "application/rss+xml",
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  return {
    date: new Date(),
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
    <Document theme="dark" title="Uh-oh!">
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
  const data = useLoaderData()

  return (
    <Document theme={data.theme}>
      <Outlet />
    </Document>
  )
}
