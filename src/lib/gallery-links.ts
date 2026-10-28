import type { GalleryExample } from '@/content/gallery';
import { site } from '@/config/site';

export function exampleShareUrl(id: string) {
  return new URL('/referans/?ornek=' + encodeURIComponent(id), site.url).toString();
}
export function exampleQuoteUrl(example: GalleryExample) {
  return (
    site.whatsapp +
    '?text=' +
    encodeURIComponent(
      'Merhaba, “' +
        example.title +
        '” örneğine benzer bir uygulama yaptırmak istiyorum. Örnek: ' +
        example.id +
        '\n' +
        exampleShareUrl(example.id),
    )
  );
}
