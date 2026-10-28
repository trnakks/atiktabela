import { examples, type SignExample } from './examples';
import { galleryAdditions } from './gallery-additions';
import {
  galleryServices,
  type GalleryAudience,
  type GalleryFamily,
  type GalleryServiceId,
} from './gallery-services';

export type GalleryExample = SignExample & {
  serviceIds: GalleryServiceId[];
  audience: GalleryAudience;
  kind: 'application' | 'study';
  keywords: string[];
};
type Meta = Partial<Pick<GalleryExample, 'serviceIds' | 'audience' | 'kind' | 'keywords'>>;
const metadata: Record<string, Meta> = {
  'sahane-altin-harf': { serviceIds: ['kutu-harf', 'isikli-tabela', 'led-tabela'] },
  'fsh-kompozit': { serviceIds: ['cephe-giydirme', 'kompozit', 'kutu-harf', 'isikli-tabela'] },
  'nail-art-neon': {
    audience: 'guzellik',
    serviceIds: ['neon-tabela', 'led-tabela', 'pleksi-kesim'],
  },
  'burgerslak-vitrin': { serviceIds: ['dijital-baski', 'sticker'] },
  'grand-gala-cephe': {
    audience: 'yeme-icme',
    serviceIds: ['cephe-giydirme', 'kompozit', 'kutu-harf', 'isiksiz-tabela'],
    keywords: ['düğün', 'davet', 'salon'],
  },
  'bereketli-dekoratif': { serviceIds: ['cnc-kesim', 'dijital-baski', 'isiksiz-tabela'] },
  'ref-yurtici': {
    audience: 'kurumsal',
    serviceIds: ['isikli-tabela', 'kutu-harf', 'led-tabela'],
    keywords: ['yurtiçi', 'kargo', 'şube'],
  },
  'ref-kasibeyaz': { serviceIds: ['kutu-harf', 'isiksiz-tabela'] },
  'ref-axa': {
    serviceIds: ['isiksiz-tabela', 'dijital-baski'],
    keywords: ['AXA', 'Asal', 'sigorta'],
  },
  'ref-century21': {
    serviceIds: ['kutu-harf', 'isiksiz-tabela'],
    keywords: ['Century21', 'Bey Group', 'gayrimenkul'],
  },
  'ref-arslan': {
    serviceIds: ['isiksiz-tabela', 'kutu-harf'],
    keywords: ['Fakir', 'Braun', 'DeLonghi', 'De’Longhi', 'Arslan', 'yetkili servis'],
  },
  'ref-espressobox': {
    serviceIds: ['kutu-harf', 'isikli-tabela', 'led-tabela'],
    keywords: ['espresso', 'kahve', 'kafe'],
  },
  'ref-evdiz': { serviceIds: ['cephe-giydirme', 'kompozit', 'kutu-harf', 'isiksiz-tabela'] },
  'ref-boranoglu': { serviceIds: ['kutu-harf', 'isikli-tabela'] },
  'ref-omur': {
    serviceIds: ['kutu-harf', 'isikli-tabela'],
    keywords: ['kasap', 'şarküteri', 'manav'],
  },
  'ref-alballon': { serviceIds: ['kutu-harf', 'isiksiz-tabela'], keywords: ['aynalı', 'metal'] },
  'ref-hairbeauty': {
    audience: 'guzellik',
    serviceIds: ['cephe-giydirme', 'kutu-harf', 'isiksiz-tabela'],
    keywords: ['kuaför', 'güzellik', 'salon'],
  },
  'ref-alkhayali': {
    serviceIds: ['isikli-tabela', 'oyma-tabela', 'led-tabela'],
    keywords: ['Alkhawali', 'Alkhayali', 'motif', 'restoran'],
  },
  'ref-hayati': { serviceIds: ['kutu-harf', 'isikli-tabela'] },
  'ref-saadetdere': {
    serviceIds: ['cephe-giydirme', 'kutu-harf', 'isiksiz-tabela'],
    keywords: ['fırın', 'ekmek'],
  },
  'ref-gok': {
    serviceIds: ['cnc-kesim', 'pleksi-kesim', 'isiksiz-tabela'],
    keywords: ['H&G', 'logo'],
  },
  'ref-lord': {
    serviceIds: ['cnc-kesim', 'dijital-baski', 'led-tabela'],
    keywords: ['otomobil', 'figür', 'kontur', 'halo'],
  },
  'ref-asel': {
    serviceIds: ['isikli-tabela', 'oyma-tabela'],
    keywords: ['baklava', 'ekler', 'pastane'],
  },
  'ref-innovia': { serviceIds: ['kutu-harf', 'pleksi-kesim', 'isiksiz-tabela'] },
  'ref-umbra': {
    audience: 'kurumsal',
    serviceIds: ['cephe-giydirme', 'kompozit', 'kutu-harf', 'isiksiz-tabela'],
  },
  'ref-atikmagaza': { serviceIds: ['isikli-tabela', 'led-tabela'] },
  'ofis-halo': { kind: 'study', serviceIds: ['kutu-harf', 'isikli-tabela'] },
  'kahve-isikli': { kind: 'study', serviceIds: ['isikli-tabela'] },
  'century-totem': {
    serviceIds: ['totem-tabela', 'isiksiz-tabela'],
    keywords: ['Century21', 'Bey Group', 'gayrimenkul'],
  },
  'aykus-germe': {
    audience: 'kurumsal',
    serviceIds: ['germe-tabela', 'dijital-baski'],
    keywords: ['afiş', 'vinil', 'branda', 'inşaat'],
  },
  'cebi-folyo': {
    serviceIds: ['yazi-kesim', 'sticker'],
    keywords: ['cam', 'folyo', 'Çebi', 'vitrin'],
  },
  'atik-matbaa': {
    kind: 'study',
    serviceIds: ['matbaa', 'brosur', 'kartvizit'],
    keywords: ['baskı', 'kâğıt', 'kurumsal kimlik'],
  },
  'atik-kase': { kind: 'study', serviceIds: ['kase'], keywords: ['kaşe', 'damga', 'otomatik'] },
  'atik-yonlendirme': {
    kind: 'study',
    serviceIds: ['yonlendirme', 'yazi-kesim'],
    keywords: ['kapı', 'isimlik', 'kat', 'resepsiyon'],
  },
  'atik-kayan': {
    kind: 'study',
    serviceIds: ['kayan-yazi', 'led-tabela'],
    keywords: ['LED ekran', 'duyuru', 'piksel'],
  },
  'kesim-detay': {
    kind: 'study',
    serviceIds: ['lazer-kesim', 'pleksi-kesim', 'kompozit-kesim', 'cnc-kesim'],
    keywords: ['dekoratif', 'kontur', 'malzeme', 'logo'],
  },
};
export function enrichExample(item: SignExample): GalleryExample {
  const meta = metadata[item.id] ?? {};
  return {
    ...item,
    ...(['ref-axa', 'ref-arslan'].includes(item.id) ? { service: 'isiksiz-tabela' as const } : {}),
    ...(item.id === 'ref-asel' ? { lightOffImage: '/images/referans-asel-kapali-v2.webp' } : {}),
    ...(item.id === 'ofis-halo' ? { lightOffImage: '/images/ofis-halo-isik-kapali-v2.webp' } : {}),
    serviceIds: meta.serviceIds ?? [item.service],
    audience:
      meta.audience ??
      (item.sector === 'Yeme & içme'
        ? 'yeme-icme'
        : item.sector === 'Ofis'
          ? 'kurumsal'
          : 'magaza'),
    kind: meta.kind ?? (item.id.startsWith('service-') ? 'study' : 'application'),
    keywords: meta.keywords ?? [],
  };
}
const featured = [
  'sahane-altin-harf',
  'ref-yurtici',
  'fsh-kompozit',
  'nail-art-neon',
  'ref-century21',
  'ref-kasibeyaz',
  'burgerslak-vitrin',
  'ref-boranoglu',
  'ref-alkhayali',
  'century-totem',
  'cebi-folyo',
  'atik-matbaa',
];
export const galleryExamples: GalleryExample[] = [
  ...examples.filter((item) => item.image),
  ...galleryAdditions,
]
  .map(enrichExample)
  .sort(
    (a, b) =>
      (featured.indexOf(a.id) < 0 ? 100 : featured.indexOf(a.id)) -
      (featured.indexOf(b.id) < 0 ? 100 : featured.indexOf(b.id)),
  );

export function normalizeGalleryText(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[’'&.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
export type GalleryFilters = { family: string; audience: string; service: string; query: string };
export const emptyGalleryFilters: GalleryFilters = {
  family: '',
  audience: '',
  service: '',
  query: '',
};
export function matchesExample(item: GalleryExample, filters: GalleryFilters) {
  const tags = galleryServices.filter((s) => item.serviceIds.includes(s.id));
  const searchable = normalizeGalleryText(
    [item.title, item.surface, item.lighting, ...item.keywords, ...tags.map((s) => s.title)].join(
      ' ',
    ),
  );
  const tokens = normalizeGalleryText(filters.query).split(' ').filter(Boolean);
  return (
    (!filters.family || tags.some((s) => s.family === (filters.family as GalleryFamily))) &&
    (!filters.audience || item.audience === filters.audience) &&
    (!filters.service || item.serviceIds.includes(filters.service as GalleryServiceId)) &&
    tokens.every((token) => searchable.includes(token))
  );
}
