import '../src/presentation/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { GA_TRACKING_ID } from 'presentation/components/elements/meta/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="google-adsense"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8714316516740312"
        crossOrigin="anonymous"
      />
      <Script
        id="gtag"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
