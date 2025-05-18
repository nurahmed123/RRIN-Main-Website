import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Arionys Invoicer - Professional Invoice Maker",
  description:
    "Easily create, manage, and send professional invoices with Arionys Invoicer by Arionys. Simple, fast, and powerful invoicing for businesses of all sizes.",
  keywords: [
    "invoice maker",
    "Arionys Invoicer",
    "Arionys",
    "create invoices",
    "send invoices",
    "invoice generator",
    "business invoicing app",
    "professional invoicing",
    "small business invoice",
    "easy invoice creator",
  ],
  authors: [{ name: "Arionys", url: "https://arionys.com" }],
  creator: "Arionys",
  publisher: "Arionys",
  openGraph: {
    title: "Arionys Invoicer - Professional Invoice Maker by Arionys",
    description:
      "Easily create and send professional invoices with Arionys Invoicer by Arionys. Streamline your billing process today!",
    url: "https://invoice.arionys.com", // Replace with your actual deployed app URL
    siteName: "Arionys Invoicer",
    images: [
      {
        url: "https://your-app-url.com/og-image.png", // Add a good Open Graph image for sharing
        width: 1200,
        height: 630,
        alt: "Arionys Invoicer - Invoicing Made Simple",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arionys Invoicer - Create Professional Invoices Instantly",
    description:
      "Create, customize, and send invoices effortlessly with Arionys Invoicer by Arionys.",
    images: [
      "https://your-app-url.com/og-image.png", // Same or similar image for Twitter
    ],
  },
  metadataBase: new URL("https://invoice.arionys.com"), // Your deployed URL
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
