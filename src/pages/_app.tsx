import "css/prism.css"
import "css/tailwind.css"
import { ThemeProvider } from "next-themes"
import Head from "next/head"
import LayoutWrapper from "components/LayoutWrapper"
import Analytics from "components/analytics"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
