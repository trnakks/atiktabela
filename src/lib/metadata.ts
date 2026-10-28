import type { Metadata } from 'next';
import { site } from '@/config/site';

export const socialImage = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'ATİK TABELA — Tabela, tasarım ve uygulama',
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = path === '/' ? title : `${title} | ${site.name}`;
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: new URL(path, site.url).toString(),
      siteName: site.name,
      locale: 'tr_TR',
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}
