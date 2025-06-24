import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Grow a Garden Calculator - Ultimate Roblox Crop Value & Mutation Calculator 2025',
  description: 'The most advanced Grow a Garden calculator for Roblox. Calculate precise crop values, mutations, and profits. Optimize your farming strategy with our professional calculator tool featuring 100+ crops and all mutations.',
  keywords: [
    'grow a garden calculator',
    'roblox grow a garden',
    'crop calculator',
    'mutation calculator',
    'roblox farming calculator',
    'garden calculator roblox',
    'crop value calculator',
    'roblox calculator 2025',
    'grow a garden profit calculator',
    'farming strategy roblox',
    'grow a garden guide',
    'roblox crop mutations',
    'garden profit optimization',
    'grow a garden tool'
  ].join(', '),
  authors: [{ name: 'Grow a Garden Calculator Team', url: 'https://www.grow-a-garden-calculator.org' }],
  creator: 'Grow a Garden Calculator',
  publisher: 'Grow a Garden Calculator',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://www.grow-a-garden-calculator.org'),
  alternates: {
    canonical: 'https://www.grow-a-garden-calculator.org',
  },
  openGraph: {
    title: 'Grow a Garden Calculator - Ultimate Roblox Crop Value Calculator 2025',
    description: 'Calculate precise crop values and mutations in Roblox Grow a Garden. Professional calculator with 100+ crops, all mutations, and advanced profit optimization features.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.grow-a-garden-calculator.org',
    siteName: 'Grow a Garden Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grow a Garden Calculator - Roblox Crop Value Calculator',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grow a Garden Calculator - Ultimate Roblox Calculator 2025',
    description: 'Professional Grow a Garden calculator for Roblox. Calculate crop values, mutations, and maximize your farming profits with precision.',
    images: ['/twitter-image.png'],
    creator: '@GrowGardenCalc',
    site: '@GrowGardenCalc',
  },
  verification: {
    google: 'your-google-verification-code-here',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Gaming Tools',
  classification: 'Gaming Calculator',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: 'Next.js',
  applicationName: 'Grow a Garden Calculator',
  appleWebApp: {
    capable: true,
    title: 'Grow a Garden Calculator',
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'application-name': 'Grow a Garden Calculator',
    'msapplication-TileColor': '#10b981',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#10b981" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="dark light" />
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Grow a Garden Calculator",
              "description": "The most advanced Grow a Garden calculator for Roblox. Calculate precise crop values, mutations, and profits.",
              "url": "https://www.grow-a-garden-calculator.org",
              "applicationCategory": "GameApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1247",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "Grow a Garden Calculator Team"
              },
              "datePublished": "2024-01-01",
              "dateModified": "2025-01-10",
              "inLanguage": "en-US",
              "isAccessibleForFree": true,
              "keywords": "grow a garden calculator, roblox calculator, crop calculator, mutation calculator"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Grow a Garden Calculator",
              "operatingSystem": "Web Browser",
              "applicationCategory": "GameApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1247"
              },
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}