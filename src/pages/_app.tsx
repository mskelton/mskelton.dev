import "css/prism.css"
import "css/tailwind.css"
import LayoutWrapper from "components/LayoutWrapper"
import Analytics from "components/analytics"
import { ThemeProvider } from "next-themes"
import Head from "next/head"

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
