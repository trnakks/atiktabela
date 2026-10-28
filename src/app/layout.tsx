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
  icons: { icon: '/icon.svg' },
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
