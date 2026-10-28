import { galleryFamilies, galleryServices, offeringAnchor } from './gallery-services';
import { offeringGroups } from './offerings';
import { galleryExamples } from './gallery';
const preferredExamples: Record<string, string> = {
  'kutu-harf': 'sahane-altin-harf',
  'isikli-tabela': 'ref-yurtici',
  'isiksiz-tabela': 'ref-century21',
  'oyma-tabela': 'ref-asel',
  'germe-tabela': 'aykus-germe',
  'led-tabela': 'ref-atikmagaza',
  'kayan-yazi': 'atik-kayan',
  'neon-tabela': 'nail-art-neon',
  'totem-tabela': 'century-totem',
  yonlendirme: 'atik-yonlendirme',
  'cephe-giydirme': 'fsh-kompozit',
  kompozit: 'ref-umbra',
  'dijital-baski': 'burgerslak-vitrin',
  sticker: 'service-sticker',
  'yazi-kesim': 'cebi-folyo',
  'cnc-kesim': 'ref-gok',
  'pleksi-kesim': 'ref-innovia',
  'kompozit-kesim': 'service-kompozit-kesim',
  'lazer-kesim': 'service-lazer-kesim',
  matbaa: 'service-matbaa',
  brosur: 'service-brosur',
  kartvizit: 'service-kartvizit',
  kase: 'atik-kase',
};

const descriptions: Record<string, string> = Object.fromEntries(
  offeringGroups.flatMap((group) =>
    group.items.map(([title, text]) => [offeringAnchor(title), text]),
  ),
);
Object.assign(descriptions, {
  'kutu-harf':
    'Pleksi veya metalden üç boyutlu harfler. Işıklı ya da ışıksız seçeneklerle marka adınızı öne çıkarır.',
  'isikli-tabela':
    'Akşam görünürlüğü için ışık dağılımı, okunabilirlik ve elektrik bağlantısı birlikte planlanan tabelalar.',
  'led-tabela':
    'Sabit harf veya tabela yüzeyini LED modüllerle aydınlatma. Mesaj gösteren panolar için kayan yazıyı inceleyin.',
  'neon-tabela': 'İç mekânda logo, çizgisel grafik ve dekoratif yazılar için LED neon çözümleri.',
  'totem-tabela':
    'Yol yaklaşımı ve tesis girişleri için bağımsız taşıyıcılı, ışıklı veya ışıksız dikey tabelalar.',
  yonlendirme: 'Giriş, kat ve oda bilgilerini tutarlı bir sistemde sunan okunaklı levhalar.',
  kompozit:
    'Tabela zemini ve mimari detaylarda kompozit panel seçimi, ölçülendirme ve birleşim planlaması.',
  'cephe-giydirme':
    'Giriş, vitrin ve tabela alanını birlikte yenileyen cephe kaplama ve uygulama çözümleri.',
});
const presentation = {
  tabela: {
    headline: 'İlk bakışta tanınan bir marka.',
    intro: 'Mağaza cephesinden karşılama duvarına; doğru ölçek, okunaklı harfler ve dengeli ışık.',
    image: '/images/referans-boranoglu.webp',
    alt: 'Boranoğlu satış ofisi için altın tonlu harf tasarım örneği',
    caption: 'Kutu harf · Tasarım örneği',
    preparation: 'Alan fotoğrafı, yaklaşık ölçü ve varsa logonuz.',
  },
  cephe: {
    headline: 'Tabelayla bütünleşen bir cephe.',
    intro: 'Panel, renk ve montaj detaylarını tek bir mimari bütünlük içinde ele alın.',
    image: '/images/referans-gala.webp',
    alt: 'Grand Gala için tabela ve cephe bütünlüğü tasarım örneği',
    caption: 'Tabela ve cephe · Tasarım örneği',
    preparation: 'Cephe fotoğrafları, yaklaşık genişlik ve yükseklik.',
  },
  baski: {
    headline: 'Vitrininiz de markanızı anlatsın.',
    intro:
      'Cam, ürün ve tanıtım yüzeyleri için yerinde bir mesaj; doğru malzeme ve temiz uygulama.',
    image: '/images/referans-axa.webp',
    alt: 'AXA Asal Sigorta için baskılı tabela yüzeyi tasarım örneği',
    caption: 'Baskılı reklam yüzeyi · Tasarım örneği',
    preparation: 'Uygulama yüzeyi, ölçü, adet ve varsa baskı dosyası.',
  },
  kesim: {
    headline: 'Küçük detaylarda büyük fark.',
    intro: 'Harf, logo ve dekoratif parçalar için çiziminize ve malzemenize uygun işleme.',
    image: '/images/gallery-kesim-detay.webp',
    alt: 'Pleksi, metal ve kompozit malzemelerle kesim tasarım çalışması',
    caption: 'Malzeme ve kesim · Tasarım çalışması',
    preparation: 'Çizim veya örnek görsel, malzeme, kalınlık ve adet.',
  },
  matbaa: {
    headline: 'Elde kalan bir marka kimliği.',
    intro: 'Kartvizit, broşür ve kaşede aynı tasarım dili; okunaklı, özenli ve birbiriyle uyumlu.',
    image: '/images/gallery-atik-matbaa.webp',
    alt: 'Atik Tabela kartvizit ve broşür tasarım çalışması',
    caption: 'Kurumsal baskı · Tasarım çalışması',
    preparation: 'Ürün türü, adet, ölçü ve varsa logo veya tasarım dosyası.',
  },
};
export const serviceDirectory = galleryFamilies.map((family) => ({
  ...family,
  ...presentation[family.id],
  items: galleryServices
    .filter((service) => service.family === family.id)
    .map((service) => {
      const example =
        galleryExamples.find(
          (example) =>
            example.id === preferredExamples[service.id] && example.serviceIds.includes(service.id),
        ) ?? galleryExamples.find((example) => example.serviceIds.includes(service.id));
      return {
        ...service,
        description: descriptions[service.id],
        preview: example?.image
          ? {
              id: example.id,
              title: example.title,
              image: example.image.replace('.webp', '-480.webp'),
            }
          : undefined,
      };
    }),
}));
