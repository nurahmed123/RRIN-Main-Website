import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export const metadata: Metadata = {
  title: "Arionys Coder - Online Code Execution & Sharing",
  description:
    "Arionys Coder by Arionys, made by Nur Ahmed, is an online coding platform where users can write, execute, and share code snippets instantly.",
  openGraph: {
    title: "Arionys Coder - Online Code Execution & Sharing",
    description:
      "Run, share, and collaborate on code snippets instantly with Arionys Coder.",
    url: "code.arionys.com",
    siteName: "Arionys Coder",
    images: [
      {
        url: "https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png", // Replace with a real image URL
        width: 1200,
        height: 630,
        alt: "Arionys Coder Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle", // Replace with your Twitter handle
    title: "Arionys Coder - Online Code Execution & Sharing",
    description:
      "Run, share, and collaborate on code snippets instantly with Arionys Coder.",
    images: ["/https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png"], // Replace with an actual image
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>

          <Footer />

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

// https://emkc.org/api/v2/piston/runtimes
