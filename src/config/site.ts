export const site = {
  name: 'ATİK TABELA',
  url: 'https://atiktabela.com',
  description:
    '1985’ten beri İstanbul’da tabela üretimi ve montajı. Işıklı tabela, kutu harf ve cephe uygulamaları için ATİK TABELA’dan teklif alın.',
  address: {
    streetAddress: 'Talatpaşa Mahallesi, 1047. Sokak No:19/B',
    district: 'Esenyurt',
    city: 'İstanbul',
    postalCode: '34513',
    country: 'TR',
  },
  geo: { latitude: 41.023381, longitude: 28.6697303 },
  phone: '+90 542 774 37 35',
  phoneHref: 'tel:+905427743735',
  secondaryPhone: '0536 476 57 88',
  secondaryPhoneHref: 'tel:+905364765788',
  whatsapp: 'https://wa.me/905427743735',
  map: 'https://maps.app.goo.gl/TeM7hcxkY5XHJkxf7',
  mapEmbed: 'https://www.google.com/maps?cid=8268459851229132542&output=embed&hl=tr',
  designer: { name: 'Turan Akkuş', url: 'https://turankkus.com' },
} as const;

export const navigation = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hakkımızda', href: '/hakkimizda/' },
  { label: 'Hizmetler', href: '/hizmetler/' },
  { label: 'Referanslarımız', href: '/referans/' },
  { label: 'İletişim', href: '/iletisim/' },
] as const;
