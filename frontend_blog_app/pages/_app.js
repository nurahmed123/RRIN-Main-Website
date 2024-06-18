import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TopLoadingLine from "@/components/TopLoadingLine";
import "@/styles/tailwind.css"
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {

  return <>
    <Header />
    <main>
      <TopLoadingLine />
      <Aos>
        <Component {...pageProps} />
      </Aos>
      <ScrollToTopButton />
      <Footer />
    </main>
  </>
}
