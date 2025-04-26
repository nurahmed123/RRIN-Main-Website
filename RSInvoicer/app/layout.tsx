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
  title: "RS Invoicer - Professional Invoice Maker",
  description:
    "Easily create, manage, and send professional invoices with RS Invoicer by Robo Superior. Simple, fast, and powerful invoicing for businesses of all sizes.",
  keywords: [
    "invoice maker",
    "RS Invoicer",
    "Robo Superior",
    "create invoices",
    "send invoices",
    "invoice generator",
    "business invoicing app",
    "professional invoicing",
    "small business invoice",
    "easy invoice creator",
  ],
  authors: [{ name: "Robo Superior", url: "https://robosuperior.com" }],
  creator: "Robo Superior",
  publisher: "Robo Superior",
  openGraph: {
    title: "RS Invoicer - Professional Invoice Maker by Robo Superior",
    description:
      "Easily create and send professional invoices with RS Invoicer by Robo Superior. Streamline your billing process today!",
    url: "https://invoice.robosuperior.com", // Replace with your actual deployed app URL
    siteName: "RS Invoicer",
    images: [
      {
        url: "https://your-app-url.com/og-image.png", // Add a good Open Graph image for sharing
        width: 1200,
        height: 630,
        alt: "RS Invoicer - Invoicing Made Simple",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RS Invoicer - Create Professional Invoices Instantly",
    description:
      "Create, customize, and send invoices effortlessly with RS Invoicer by Robo Superior.",
    images: [
      "https://your-app-url.com/og-image.png", // Same or similar image for Twitter
    ],
  },
  metadataBase: new URL("https://invoice.robosuperior.com"), // Your deployed URL
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
