import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TopLoadingLine from "@/components/TopLoadingLine";
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useState, useEffect } from 'react';
import "@/styles/tailwind.css"
import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Use useRouter hook

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Check if the route is already complete when the component mounts
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
  }, [router.isReady]); // Add router.events as dependency

  return <>
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
}
