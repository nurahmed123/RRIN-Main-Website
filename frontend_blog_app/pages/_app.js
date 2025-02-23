import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TopLoadingLine from "@/components/TopLoadingLine";
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useState, useEffect } from 'react';
import Script from "next/script"; // Import the Script component
import "@/styles/tailwind.css"
import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    if (router.isReady) {
      setLoading(false);
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.isReady]);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-D8K4FT3YF8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D8K4FT3YF8');
        `}
      </Script>


      <SessionProvider session={session}>
        <Header />
        <main>
          <TopLoadingLine />
          <Aos>
            <Component {...pageProps} />
          </Aos>
          <ScrollToTopButton />
          <Footer />
        </main>
      </SessionProvider>
    </>
  );
}
