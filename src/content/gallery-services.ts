export const galleryFamilies = [
  { id: 'tabela', title: 'Tabela' },
  { id: 'cephe', title: 'Cephe kaplama' },
  { id: 'baski', title: 'Baskı & folyo' },
  { id: 'kesim', title: 'Kesim & logo' },
  { id: 'matbaa', title: 'Matbaa & kaşe' },
] as const;
export type GalleryFamily = (typeof galleryFamilies)[number]['id'];

export const galleryServices = [
  { id: 'kutu-harf', title: 'Kutu harf', family: 'tabela' },
  { id: 'isikli-tabela', title: 'Işıklı tabela', family: 'tabela' },
  { id: 'isiksiz-tabela', title: 'Işıksız tabela', family: 'tabela' },
  { id: 'oyma-tabela', title: 'Oyma tabela', family: 'tabela' },
  { id: 'germe-tabela', title: 'Germe tabela', family: 'tabela' },
  { id: 'led-tabela', title: 'LED tabela', family: 'tabela' },
  { id: 'kayan-yazi', title: 'Kayan yazı', family: 'tabela' },
  { id: 'neon-tabela', title: 'LED neon', family: 'tabela' },
  { id: 'totem-tabela', title: 'Totem tabela', family: 'tabela' },
  { id: 'yonlendirme', title: 'Yönlendirme', family: 'tabela' },
  { id: 'cephe-giydirme', title: 'Dış cephe kaplama', family: 'cephe' },
  { id: 'kompozit', title: 'Kompozit', family: 'cephe' },
  { id: 'dijital-baski', title: 'Dijital baskı', family: 'baski' },
  { id: 'sticker', title: 'Sticker', family: 'baski' },
  { id: 'yazi-kesim', title: 'Yazı kesim', family: 'baski' },
  { id: 'cnc-kesim', title: 'CNC & özel kesim', family: 'kesim' },
  { id: 'pleksi-kesim', title: 'Pleksi kesim', family: 'kesim' },
  { id: 'kompozit-kesim', title: 'Kompozit kesim', family: 'kesim' },
  { id: 'lazer-kesim', title: 'Lazer kesim', family: 'kesim' },
  { id: 'matbaa', title: 'Matbaa', family: 'matbaa' },
  { id: 'brosur', title: 'Broşür', family: 'matbaa' },
  { id: 'kartvizit', title: 'Kartvizit', family: 'matbaa' },
  { id: 'kase', title: 'Kaşe', family: 'matbaa' },
] as const satisfies readonly { id: string; title: string; family: GalleryFamily }[];
export type GalleryServiceId = (typeof galleryServices)[number]['id'];
export function galleryServiceHref(id: GalleryServiceId) {
  return `/hizmetler/#${id}`;
}
export function offeringAnchor(title: string) {
  const aliases: Record<string, string> = {
    'CNC kesim': 'cnc-kesim',
    'Dış cephe kaplama': 'cephe-giydirme',
  };
  return (
    aliases[title] ??
    galleryServices.find((service) => service.title === title)?.id ??
    'tabela-reklam'
  );
}
export const galleryAudiences = [
  { id: 'magaza', title: 'Mağaza & perakende' },
  { id: 'yeme-icme', title: 'Kafe & restoran' },
  { id: 'kurumsal', title: 'Ofis & kurumsal' },
  { id: 'guzellik', title: 'Güzellik & bakım' },
] as const;
export type GalleryAudience = (typeof galleryAudiences)[number]['id'];
