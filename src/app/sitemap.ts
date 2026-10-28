import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { galleryExamples } from '@/content/gallery';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    'hakkimizda',
    'hizmetler',

    'referans',
    'surecimiz',
    'iletisim',
    'teklif-al',
    'gizlilik',
  ].map((path) => ({
    url: `${site.url}/${path}${path ? '/' : ''}`,
    changeFrequency: 'monthly',
    priority: path ? 0.7 : 1,
    ...(path === 'referans'
      ? {
          images: galleryExamples
            .filter((example) => example.image)
            .map((example) => site.url + example.image),
        }
      : {}),
  }));
}
