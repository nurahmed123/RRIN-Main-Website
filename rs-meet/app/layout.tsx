import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RS Meet | Video Conferencing & Online Meetings',
  description:
    'RS Meet by Robo Superior is a next-gen video conferencing platform. Host meetings, schedule calls, and collaborate seamlessly.',
  keywords: [
    'RS Meet',
    'Robo Superior Meet',
    'Video conferencing',
    'Online meetings',
    'Google Meet alternative',
    'Free video calls',
    'Schedule meetings',
    'Secure video chat',
  ],
  authors: [{ name: 'Robo Superior', url: 'https://robosuperior.com' }],
  icons: {
    icon: '/icons/logo.svg',
  },
  openGraph: {
    title: 'RS Meet | Secure Video Meetings',
    description:
      'Experience high-quality, secure, and easy-to-use video meetings with RS Meet (Robo Superior Meet). Start an instant meeting or schedule one today!',
    url: 'https://meet.robosuperior.com',
    siteName: 'RS Meet',
    images: [
      {
        url: 'https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/8b5672bd-81f3-495e-89a5-b064858a5928.png',
        width: 1200,
        height: 630,
        alt: 'RS Meet - Video Conferencing',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: 'iconButton',
            logoImageUrl: '/icons/logo.svg',
          },
          variables: {
            colorText: '#fff',
            colorPrimary: '#0E78F9',
            colorBackground: '#1C1F2E',
            colorInputBackground: '#252A41',
            colorInputText: '#fff',
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          <Toaster />
          {children}

          {/* popup Script */}
          <Script
            id="adsterra-ad"
            strategy="lazyOnload"
            src="//southflannelclassic.com/62/03/71/62037180d8990945967c1a219e9cf55e.js"
          />

          <Script
            id="adsterra-ad-options"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            atOptions = {
              'key' : '328ea0f1a6ed988d460bfe1653dc3f9e',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          `,
            }}
          />

          {/* External ad script */}
          <Script
            id="adsterra-ad-script"
            strategy="afterInteractive"
            src="//southflannelclassic.com/328ea0f1a6ed988d460bfe1653dc3f9e/invoke.js"
          />

          {/* Ad Script */}
          <Script
            id="adsterra-ad"
            strategy="lazyOnload"
            async={true}
            data-cfasync="false"
            src="//southflannelclassic.com/4acfee4fec061346e24c489b7a6f5dba/invoke.js"
          />

          {/* ✅ FIX: Added `id="structured-data"` to avoid Next.js warning */}
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'RS Meet',
                url: 'https://meet.robosuperior.com',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://meet.robosuperior.com',
                  'query-input': 'required name=search_term_string',
                },
              }),
            }}
          />
        </body>
      </ClerkProvider>
    </html>
  );
}
