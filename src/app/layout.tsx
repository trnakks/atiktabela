import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FloatingContact } from '@/components/floating-contact';
import { site } from '@/config/site';
import { socialImage } from '@/lib/metadata';
import { BusinessSchema } from '@/components/business-schema';
import './globals.css';
import './details.css';
import './gallery.css';
import './services.css';
import './home.css';
import './about.css';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'ATİK TABELA — Markanızın sokaktaki imzası', template: '%s | ATİK TABELA' },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: 'tr_TR',
    type: 'website',
    siteName: site.name,
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: [{ url: socialImage.url, alt: socialImage.alt }],
  },
  robots: { index: process.env.SITE_INDEXABLE !== 'false', follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="preload"
          href="/fonts/montserrat-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/montserrat-latin-ext.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <BusinessSchema />
        <a href="#main" className="skip-link">
          İçeriğe geç
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
