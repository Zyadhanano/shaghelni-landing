import { useEffect } from 'react';
import Script from 'next/script';
import '../styles/globals.css'; // If you use global CSS

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // replace this with your ID
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-Z6WYS1DP8R`}
      />
      <Component {...pageProps} />
    </>
  );
}
