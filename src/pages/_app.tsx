import "../css/style.css"
import type { AppProps } from "next/app"
import Script from "next/script"

export default function App({ Component, pageProps }: AppProps) {
  const isLocal = process.env.NODE_ENV !== "production"
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'denied' });
          gtag('config', '${measurementId}', { debug_mode: ${isLocal} });
        `}
      </Script>

      <Component {...pageProps} />
    </>
  )
}
