# ATİK TABELA

Türkçe Next.js / React / TypeScript sitesi. Statik çıktı `out/` dizinine üretilir.

## Çalıştırma

```sh
npm install
npm run dev
npm run check
npm run preview
npm run test:e2e
```

Önizleme: http://localhost:3100 . Testler Chrome kullanır.
Yayın öncesi ve sonrası adımlar: [LAUNCH.md](LAUNCH.md). Amplify yönlendirme JSON'u hesap ayarlarına ayrıca uygulanmalıdır.

## Güncel yapı

- Sayfalar: `src/app/`; referans galerisi `/referans/` adresindedir.
- İletişim, telefon, WhatsApp ve harita: `src/config/site.ts`.
- Beş hizmet grubu ve 23 hizmet: `src/content/gallery-services.ts`, `service-directory.ts`.
- Galeri eşleştirmeleri: `src/content/gallery.ts`; içerikler `examples.ts`, `reference-examples.ts`, `gallery-additions.ts`, `service-design-examples.ts`.
- İletişim ve teklif formları WhatsApp mesajı hazırlar. Müşterinin isteğe bağlı e-posta alanı korunur.
- Eski hizmet detayları, tabela modelleri ve eski galeri adresleri yalnızca yönlendirme içindir. Hosting desteği için `public/_redirects`; statik yedek yönlendirmeler için `legacy-redirect.tsx` kullanılır.
- Görseller ve duyarlı önizlemeler: `public/images/`; açık/kapalı ışık çiftleri korunmalıdır.
- Geçmiş görsel üretim kayıtları ve istem notları proje dışındaki `../atik-tabela-kayitlar-20261029.zip` arşivindedir.
- Orijinal referans fotoğrafları proje dışındaki kardeş `atik tabela resimler` klasöründedir.

## Temizlik kaydı

Kullanılmayan eski kaynaklar, çizim bileşeni, görseller, inceleme çıktıları ve tek seferlik görsel hazırlama betikleri temizlendi. Geçmiş kayıtlar ve önceki kurtarma kopyaları proje dışındaki `../atik-tabela-kayitlar-20261029.zip` arşivine alındı; siteye dahil edilmez.

Temizlik sonrası TypeScript, üretim derlemesi ve 30 masaüstü/mobil test başarılıdır. `node_modules`, `.next`, `out` çalışma/derleme dizinleridir; geliştirme ve derleme sırasında tekrar oluşmaları normaldir.
