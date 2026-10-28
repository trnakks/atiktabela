export const services = [
  {
    slug: 'kutu-harf',
    title: 'Kutu harf tabela',
    category: 'Işıklı tabela',
    short: 'Mağaza ve ofis girişleri için üç boyutlu harfler.',
    description:
      'Harflerin derinliği, malzemenin karakteri ve ışığın dengesi. Cephenize uygun bir kutu harf çözümü için ölçü, tipografi ve aydınlatmayı birlikte değerlendiriyoruz.',
    material: 'Pleksi / metal',
    light: 'Önden veya arkadan LED',
    text: 'ATİK',
    variant: 'letters',
  },
  {
    slug: 'isikli-tabela',
    title: 'Işıklı tabela',
    category: 'Işıklı tabela',
    short: 'Akşam saatlerinde de okunabilen işletme tabelaları.',
    description:
      'Gece ve gündüz okunabilirliği bir arada ele alan tabela tasarımları. Işık dağılımı, yüzey seçimi ve montaj detaylarıyla bütünlüklü bir görünüm.',
    material: 'Pleksi / alüminyum',
    light: 'LED aydınlatma',
    text: 'KAHVE',
    variant: 'light',
  },
  {
    slug: 'cephe-giydirme',
    title: 'Cephe giydirme',
    category: 'Cephe',
    short: 'Tabela, vitrin ve cephe yüzeyini birlikte düşünün.',
    description:
      'Tabelayı mimarinin bir parçası olarak ele alın. Cephe yüzeyi, renk, ölçek ve tabela yerleşimini işletmenizin kimliği etrafında bir araya getirin.',
    material: 'Kompozit / metal',
    light: 'Projeye özel',
    text: 'ATÖLYE',
    variant: 'facade',
  },
  {
    slug: 'totem-tabela',
    title: 'Totem tabela',
    category: 'Dış mekân',
    short: 'Yol kenarları ve tesis girişleri için dikey çözümler.',
    description:
      'Yol ve geniş alanlarda görünürlük için dikey tabela çözümleri. Yerleşim, görüş mesafesi ve çevre koşulları projenin başlangıcında değerlendirilir.',
    material: 'Metal konstrüksiyon',
    light: 'Işıklı / ışıksız',
    text: 'ATİK',
    variant: 'totem',
  },
  {
    slug: 'neon-tabela',
    title: 'Neon tabela',
    category: 'İç mekân',
    short: 'Karşılama duvarları için dekoratif LED neon.',
    description:
      'Bir cümle, bir işaret veya markanızın adı. Dekoratif LED neon çözümleriyle mekânınızın atmosferini tamamlayan bir odak noktası oluşturun.',
    material: 'LED neon / pleksi',
    light: 'Dekoratif LED',
    text: 'bi kahve?',
    variant: 'neon',
  },
  {
    slug: 'yonlendirme',
    title: 'Yönlendirme & iç mekân',
    category: 'İç mekân',
    short: 'Kat, oda ve bölüm bilgileri için okunaklı bir sistem.',
    description:
      'Karşılama alanlarından kat yönlendirmelerine kadar, mekân içinde tutarlı ve anlaşılır bir görsel dil. Okunabilirliği tasarımın merkezine alan çözümler.',
    material: 'Metal / folyo / pleksi',
    light: 'Projeye özel',
    text: '01 →',
    variant: 'wayfinding',
  },
] as const;
export type Service = (typeof services)[number];

export const process = [
  {
    title: 'Önce sizi dinliyoruz.',
    text: 'Alan fotoğrafı, çizim veya ürün örneğiyle başlıyoruz. Kullanım amacı, yaklaşık ölçü ve adet bilgilerini birlikte değerlendiriyoruz.',
  },
  {
    title: 'Birlikte şekillendiriyoruz.',
    text: 'Tasarım, malzeme, renk ve üretim seçeneklerini değerlendiriyoruz. Baskı, kesim veya uygulama kapsamı netleştikçe teklif ve takvimi paylaşıyoruz.',
  },
  {
    title: 'Detayları hayata geçiriyoruz.',
    text: 'Kesin ölçü, adet ve üretim dosyası onaylandıktan sonra çalışmayı hazırlıyoruz. İşin kapsamına göre teslimat veya montaj adımlarını planlıyoruz.',
  },
];
export const faqs = [
  {
    question: 'Fiyat neye göre belirlenir?',
    answer:
      'Ürün türü, ölçü, adet, malzeme ve tasarım hazırlığı fiyatı etkiler. Tabela ve cephede ışık, söküm ve montaj koşulları; baskıda kâğıt ve yüzey; kesimde kalınlık ve çizim detayları değerlendirilir. Kapsamı birlikte netleştirip teklif paylaşırız.',
  },
  {
    question: 'Teklif almak için hangi bilgileri paylaşmalıyım?',
    answer:
      'Tabela ve cephe için fotoğraf ve yaklaşık ölçü; baskı ve matbaa için ürün türü, ölçü ve adet; kesim için çizim, malzeme ve kalınlık paylaşabilirsiniz. Varsa logonuzu da ekleyin. Eksik bilgileri birlikte tamamlayabiliriz.',
  },
  {
    question: 'Hangi hizmeti seçmeliyim?',
    answer:
      'Tabela işletmenizin görünürlüğünü, cephe kaplama girişin bütünlüğünü, baskı ve folyo tanıtım yüzeylerini tamamlar. Özel harf ve parçalar için kesim; broşür, kartvizit ve kaşe için matbaa grubunu inceleyebilirsiniz.',
  },
  {
    question: 'Üretim ve teslim süresi ne kadar?',
    answer:
      'Süre; adet, ölçü, malzeme, tasarım ve varsa uygulama koşullarına göre değişir. Teslimat veya montaj takvimi, işin detayları netleştikten sonra teklif aşamasında paylaşılır.',
  },
  {
    question: 'Logo veya tasarım dosyam yoksa ne yapmalıyım?',
    answer:
      'İşletmenizin adını, faaliyet alanını ve beğendiğiniz örnekleri paylaşarak başlayabilirsiniz. Tasarım ihtiyacınızı ilk görüşmede birlikte netleştirebiliriz.',
  },
  {
    question: 'Eski tabelamın yerine yeni tabela yaptırabilir miyim?',
    answer:
      'Mevcut tabelanın ve cephenin fotoğraflarını paylaşın. Taşıyıcı yüzey, elektrik bağlantısı ve söküm ihtiyacı değerlendirilmeden mevcut altyapının yeniden kullanılacağı varsayılmaz. Yenileme kapsamı bu bilgilerle belirlenir.',
  },
];
