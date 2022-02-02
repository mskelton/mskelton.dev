import Script from "next/script"

export function Analytics() {
  const measurementId = process.env.GA_MEASUREMENT_ID

  return process.env.NODE_ENV !== "production" ? null : (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      <script id="ga-script" async>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', { analytics_storage: 'denied' });
        gtag('config', measurementId, {
          page_path: window.location.pathname,
        });
      </script>
    </>
  )
}
