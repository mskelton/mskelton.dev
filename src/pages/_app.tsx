import "css/app.css"
import "css/prism.css"
import "css/tailwind.css"
import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"
import Head from "next/head"
import { Analytics } from "components/Analytics"
import { LayoutWrapper } from "components/LayoutWrapper"

export default function App({ Component, pageProps }: AppProps) {
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
