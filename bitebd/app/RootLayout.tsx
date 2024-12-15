"use client";

import { Inter } from "next/font/google";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import Footer from "@/components/Footer";
import "./globals.css";
import { ThemeProvider } from "./provider";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <link rel="icon" href="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/775d2d77-7c4d-4d46-9d36-0ab6eae39b0e.png" sizes="any" />
                    <UserButton showName />
                </head>
                <body className={inter.className}>
                    <FloatingNav navItems={navItems} />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {/* <NextNProgress color="#FF0000" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} /> */}
                        {children}
                    </ThemeProvider>
                    {/* <Footer /> */}
                </body>
            </html>
        </ClerkProvider>
    );
}
