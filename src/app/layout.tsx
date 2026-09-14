import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import { Header } from '@/components/header';
import { Footer, WhatsAppButton } from '@/components/shared';
import { site } from '@/lib/site';
import './globals.css';

const theSeasons = localFont({
  src: [
    {
      path: '../../public/fonts/the-seasons/TheSeasons-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/the-seasons/TheSeasons-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/the-seasons/TheSeasons-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/the-seasons/TheSeasons-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/the-seasons/TheSeasons-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/the-seasons/TheSeasons-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-the-seasons',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Marrakech Palace — Votre horizon privé', template: '%s | Marrakech Palace' },
  description: site.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}),
};

export const viewport: Viewport = { themeColor: '#f5f1e8' };

import { LanguageProvider } from '@/lib/i18n';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={theSeasons.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <a className="skip-link" href="#contenu">Aller au contenu</a>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
