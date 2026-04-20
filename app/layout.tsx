import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import LoadingScreen from '@/components/LoadingScreen';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'TWIY Health — Foot & Ankle Surgical Distribution',
  description:
    'The regional leader in foot and ankle surgical distribution across the Southeastern United States. Advanced biologics and fixation technologies with unmatched case support.',
  keywords:
    'foot ankle surgical distribution, Southeast, biologics, fixation, Medline, OSSIO, BoneSupport, Acera Surgical, Biopoly',
  icons: {
    icon: '/Assets/ICON.ico',
    shortcut: '/Assets/ICON.ico',
  },
  openGraph: {
    title: 'TWIY Health — Foot & Ankle Surgical Distribution',
    description:
      'Advanced biologics and fixation technologies across the Southeast with precision, reliability, and unmatched case support.',
    type: 'website',
    images: [{ url: '/Assets/OG Photo.png', width: 1200, height: 630, alt: 'TWIY Health' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body suppressHydrationWarning>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
