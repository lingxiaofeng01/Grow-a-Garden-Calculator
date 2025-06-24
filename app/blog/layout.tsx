import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grow a Garden Blog - Expert Guides, Strategies & Latest Updates 2025',
  description: 'Discover expert grow a garden farming guides, crop optimization strategies, mutation tips, and latest Roblox game updates. Professional guides for maximizing your farm profits.',
  keywords: [
    'grow a garden blog',
    'grow a garden guides', 
    'roblox farming guides',
    'grow a garden strategies',
    'crop optimization guides',
    'grow a garden expert tips',
    'farming calculator guides',
    'roblox grow a garden blog',
    'grow a garden tutorials',
    'farming profit strategies',
    'grow a garden updates',
    'crop mutation guides',
    'grow a garden farming blog',
    'roblox farming strategies'
  ].join(', '),
  openGraph: {
    title: 'Grow a Garden Blog - Expert Guides & Strategies 2025',
    description: 'Professional grow a garden farming guides, strategies, and expert tips for Roblox players',
    url: 'https://www.grow-a-garden-calculator.org/blog',
    siteName: 'Grow a Garden Calculator',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.grow-a-garden-calculator.org/blog-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grow a Garden Blog - Expert Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grow a Garden Blog - Expert Guides & Strategies',
    description: 'Professional grow a garden farming guides and expert tips for Roblox players',
    images: ['https://www.grow-a-garden-calculator.org/blog-twitter-image.png'],
    creator: '@GrowGardenCalc',
  },
  alternates: {
    canonical: 'https://www.grow-a-garden-calculator.org/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 