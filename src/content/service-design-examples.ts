import type { SignExample } from './examples';
import type { GalleryServiceId } from './gallery-services';

const designs: {
  id: GalleryServiceId;
  title: string;
  purpose: string;
  surface: string;
  note: string;
}[] = [
  {
    id: 'sticker',
    title: 'Atik · Kesimli ürün etiketleri',
    purpose: 'Ürün ve ambalajlarda marka bilgisini yapışkanlı etiketlerle sunmak.',
    surface: 'Kesim konturlu vinil etiket + taşıyıcı kâğıt',
    note: 'Etiket ölçüsü, yapıştırılacak yüzey ve kullanım koşulları birlikte değerlendirilir.',
  },
  {
    id: 'kompozit-kesim',
    title: 'Kompozit · Panel ve kontur detayları',
    purpose: 'Tabela zemini ve mimari detaylar için kompozit panelde ölçülü kesim örnekleri.',
    surface: 'Alüminyum yüzeyli kompozit panel ve katmanlı kenar',
    note: 'Panel kalınlığı, kesim çizimi ve montaj payları üretim öncesinde netleştirilir.',
  },
  {
    id: 'lazer-kesim',
    title: 'Lazer kesim · Dekoratif pleksi panel',
    purpose: 'İnce motifleri ve negatif boşlukları dekoratif pleksi yüzeyde göstermek.',
    surface: 'İnce motifli pleksi panel ve kesim kenarı',
    note: 'Kesime uygunluk; malzeme, kalınlık ve çizimdeki detay aralıklarına göre değerlendirilir.',
  },
  {
    id: 'brosur',
    title: 'Atik · Katlamalı tanıtım broşürü',
    purpose: 'Hizmetleri katlamalı bir tanıtım baskısında açık ve düzenli sunmak.',
    surface: 'Kat izleri belirgin kâğıt üzerine kurumsal baskı',
    note: 'Açık ve kapalı ölçü, katlama biçimi, kâğıt ve adet siparişe göre belirlenir.',
  },
  {
    id: 'kartvizit',
    title: 'Atik · Kurumsal kartvizit',
    purpose: 'Markanın ilk temasını okunaklı tipografi ve sade bir kart tasarımıyla güçlendirmek.',
    surface: 'Mat dokulu kalın kartvizit kâğıdı',
    note: 'Son ölçü, kâğıt ve baskı seçenekleri üretim öncesinde onaylanır.',
  },
  {
    id: 'matbaa',
    title: 'Atik · Baskı ve kâğıt çalışması',
    purpose: 'Kurumsal baskıda renk, kâğıt ve sayfa düzenini bir arada değerlendirmek.',
    surface: 'Baskı tabakası, renk kontrol şeridi ve kâğıt örnekleri',
    note: 'Dosya uygunluğu, renk beklentisi, kâğıt ve baskı adedi birlikte netleştirilir.',
  },
];
export const serviceDesignExamples: SignExample[] = designs.map((design) => ({
  id: `service-${design.id}`,
  title: design.title,
  sector: 'Ofis',
  service: design.id,
  text: 'ATİK TABELA',
  variant: 'wayfinding',
  image: `/images/gallery-service-${design.id}.webp`,
  purpose: design.purpose,
  surface: design.surface,
  lighting: 'Doğal ışıkta ürün ve malzeme detayı',
  note: `Tasarım çalışması. ${design.note}`,
}));
