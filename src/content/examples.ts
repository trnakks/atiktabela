import type { Service } from './catalog';
import { referenceExamples } from './reference-examples';
import type { GalleryServiceId } from './gallery-services';

export type SignExample = {
  id: string;
  title: string;
  sector: 'Mağaza' | 'Yeme & içme' | 'Ofis' | 'Dış alan';
  service: GalleryServiceId;
  text: string;
  variant: Service['variant'];
  purpose: string;
  surface: string;
  lighting: string;
  note: string;
  image?: string;
  lightOffImage?: string;
};

export const examples: SignExample[] = [
  {
    id: 'sahane-altin-harf',
    title: 'Şahane Haloubi Perde · Altın harf',
    sector: 'Mağaza',
    service: 'kutu-harf',
    text: 'ŞAHANE',
    variant: 'letters',
    image: '/images/referans-sahane.webp',
    lightOffImage: '/images/referans-sahane-kapali.webp',
    purpose: 'Koyu zemin üzerinde altın tonlu harflerle güçlü ve okunaklı bir mağaza kimliği.',
    surface: 'Antrasit panel + altın tonlu üç boyutlu harf',
    lighting: 'Sıcak LED aydınlatma',
    note: 'Harf derinliği, logo ölçeği ve vitrinle kurulan oran cepheyi bütünler. Işığı açıp kapatarak metal yüzeyin iki görünümünü inceleyin.',
  },
  {
    id: 'fsh-kompozit',
    title: 'FSH Otomotiv · Kompozit cephe',
    sector: 'Mağaza',
    service: 'cephe-giydirme',
    text: 'FSH',
    variant: 'facade',
    image: '/images/referans-fsh.webp',
    lightOffImage: '/images/referans-fsh-kapali.webp',
    purpose: 'Geniş cephede panel, logo ve büyük ölçekli harfleri tek bir düzende birleştirmek.',
    surface: 'Mavi kompozit panel + beyaz pleksi kutu harf',
    lighting: 'Beyaz LED aydınlatma',
    note: 'Panel birleşimleri, harf montajı ve vitrin aksları birlikte değerlendirilir. Kontrast renkler uzaktan okunabilirliği destekler.',
  },
  {
    id: 'nail-art-neon',
    title: 'Nail Art · Dekoratif LED neon',
    sector: 'Ofis',
    service: 'neon-tabela',
    text: 'Nail Art',
    variant: 'neon',
    image: '/images/referans-nail.webp',
    lightOffImage: '/images/referans-nail-kapali.webp',
    purpose: 'Güzellik salonunda çizgisel logo ve el yazısını tek bir ışıklı odakta toplamak.',
    surface: 'Kontur kesim şeffaf pleksi + LED neon',
    lighting: 'Mor LED neon',
    note: 'Pleksi taşıyıcının kenarları, bağlantı noktaları ve kablo güzergâhı tasarımla birlikte çözülür. Duvar dokusu ışığın yayılımını belirler.',
  },
  {
    id: 'burgerslak-vitrin',
    title: 'Burgerslak · Vitrin dijital baskı',
    sector: 'Yeme & içme',
    service: 'dijital-baski',
    text: 'BURGERSLAK',
    variant: 'wayfinding',
    image: '/images/referans-burger.webp',
    purpose: 'Ürün görsellerini ve marka adını vitrin boyunca tutarlı bir grafik düzende sunmak.',
    surface: 'Cam üzerine dijital baskılı folyo / sticker',
    lighting: 'Işıksız uygulama',
    note: 'Baskı bölümleri cam kayıtlarına göre hazırlanır. Renk, okunabilirlik ve dış ortam kullanımına uygun folyo seçimi birlikte ele alınır.',
  },
  {
    id: 'grand-gala-cephe',
    title: 'Grand Gala Premium · Metal harf',
    sector: 'Dış alan',
    service: 'cephe-giydirme',
    text: 'GRAND GALA',
    variant: 'facade',
    image: '/images/referans-gala.webp',
    purpose: 'Davet mekânının kemerli mimarisini altın tonlu harfler ve koyu cepheyle tamamlamak.',
    surface: 'Kompozit cephe + metal görünümlü kabartma harf',
    lighting: 'Işıksız metal yüzey',
    note: 'Giriş simetrisi, yazı hiyerarşisi ve kaplama bitişleri cepheye bütünlük kazandırır. Işıksız yüzeyler doğal ışıkta malzeme karakterini öne çıkarır.',
  },
  {
    id: 'bereketli-dekoratif',
    title: 'Bereketli · Özel kesim tabela',
    sector: 'Yeme & içme',
    service: 'cnc-kesim',
    text: 'BEREKETLİ',
    variant: 'wayfinding',
    image: '/images/referans-bereket.webp',
    purpose:
      'Geometrik dış hat ve geleneksel motiflerle işletmeye özgü bir tabela biçimi oluşturmak.',
    surface: 'Özel kontur kesim gövde + dekoratif baskı yüzeyi',
    lighting: 'Işıksız uygulama',
    note: 'Dış kontur CNC kesimle hazırlanır; motifler ve yazı yüzeye uygun baskıyla tamamlanır. Kesim yöntemi malzeme ve detay ölçüsüne göre seçilir.',
  },
  ...referenceExamples,
  {
    id: 'ofis-halo',
    title: 'Resepsiyonda arkadan ışıklı metal harf',
    sector: 'Ofis',
    service: 'kutu-harf',
    text: 'ATÖLYE',
    variant: 'letters',
    image: '/images/ofis-halo-konsepti.webp',
    lightOffImage: '/images/ofis-halo-isik-kapali.webp',
    purpose: 'Karşılama duvarında sade bir marka odağı oluşturmak.',
    surface: 'Taş dokulu duvar + metal harf',
    lighting: 'Duvara yansıyan halo ışık',
    note: 'Duvarın dokusu ve harfin duvardan uzaklığı ışık halesini etkiler. Kablo çıkışları yerleşim çiziminde düşünülür.',
  },
  {
    id: 'kahve-isikli',
    title: 'Kahve dükkânı için ışıklı tabela',
    sector: 'Yeme & içme',
    service: 'isikli-tabela',
    text: 'KAHVE',
    variant: 'light',
    image: '/images/kafe-tabela-konsepti.webp',
    lightOffImage: '/images/kafe-tabela-isik-kapali.webp',
    purpose: 'Akşam saatlerinde açık olan işletmeyi sokaktan okunabilir kılmak.',
    surface: 'Metal kasa + ışık geçiren yüzey',
    lighting: 'Yüzeye dağılan LED ışık',
    note: 'Çift yönlü çıkma uygulaması düşünülüyorsa bağlantı yüzeyi ve görüş açısı ayrıca değerlendirilir.',
  },
];

export const scopeChecklist = [
  { title: 'Tasarım & ölçü', text: 'Onaylanan logo, metin, kesin ölçü, adet ve üretim dosyası.' },
  {
    title: 'Malzeme & üretim',
    text: 'Panel, pleksi, folyo veya kâğıt seçimi; baskı, kesim ve yüzey işlemleri.',
  },
  {
    title: 'Teslimat & uygulama',
    text: 'Paketleme, teslim yeri ve varsa söküm, saha hazırlığı ve montaj kapsamı.',
  },
  {
    title: 'Onay & takvim',
    text: 'Üretim onayı, teslim planı ve ışıklı uygulamalarda elektrik bağlantısı ile bakım erişimi.',
  },
];
