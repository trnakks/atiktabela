# GitHub → AWS Amplify yayın kılavuzu

## Yerel doğrulama — 29 Ekim 2026

Üretim derlemesi ve statik çıktı denetimi geçti: 8 ana sayfa, 42 referans görseli, 23 hizmet, işletme şeması, yerel bağlantılar ve sitemap. Yerel HTTP denetimi sayfaları, 16 eski URL yönlendirmesini, gerçek 404 yanıtını ve güvenlik başlıklarını doğruladı.

Son Playwright çalıştırmasında masaüstü ve mobil toplam **34/34 test geçti**. Üretim bağımlılıklarının `npm audit --omit=dev` denetiminde bilinen güvenlik açığı bulunmadı.

Lighthouse 12.8.2, mobil simülasyonu, yerel üretim önizlemesi: performans **99**, erişilebilirlik **100**, iyi uygulamalar **100**, SEO **100**; LCP **1,9 saniye**. Bunlar ana sayfanın laboratuvar sonuçlarıdır; canlı alan adı ve gerçek kullanıcı ölçümü değildir. Ham rapor `artifacts/lighthouse-home-final.json` içindedir ve Git'e dahil edilmez.

Fontlar Latin/Türkçe, noktalama, para birimleri ve ok karakterleri korunarak küçültüldü; OFL lisans dosyaları `public/fonts` içinde tutuldu. Galeri görselleri 480/768/960 piksel seçenekleriyle sunulur. Ana cephede ışıklı görsel ilk tıklamada hazırlanır.

## 1. Kaynak kod ve derleme

Node 22, `npm ci`, `npm run check`. Statik yayın çıktısı `out/` dizinidir. Derleme SEO, şema, sitemap ve dosya bütünlüğünü de doğrular. `node_modules`, `.next`, `out`, test çıktıları ve `.env` GitHub'a gönderilmez. `amplify.yml`, `customHttp.yml`, `amplify-redirects.json` ve `scripts/` gönderilmelidir. GitHub Actions'taki `Site quality` kontrolünü ana dalda zorunlu kontrol yapın; otomatik yayını kontrolleri geçen commitler için kullanın.

## 2. Amplify platformu

Repo proje içeriğiyle başlıyorsa app root kök dizindir; proje repo altında `atik-tabela-web` klasöründeyse app root bu klasör olmalıdır. Bu statik dışa aktarım için platform **WEB / statik hosting**, artifact dizini **out** olmalıdır. Otomatik seçilmiş `WEB_COMPUTE / .next` ayarını bu çıktı ile karıştırmayın. Derleme ayarı `amplify.yml`, Node 22'dir. AWS'nin statik geçiş açıklaması: https://github.com/aws-amplify/amplify-hosting/blob/main/FAQ.md#convert-an-ssr-app-to-ssg

Preview dalında `SITE_INDEXABLE=false` ve Amplify erişim koruması kullanın. Üretimde bu değişken yok veya `true` olmalıdır.

## 3. Yönlendirmeler — zorunlu hesap ayarı

Amplify → Hosting → Rewrites and redirects → JSON düzenleyicisine `amplify-redirects.json` içeriğini uygulayın. Mevcut özel kuralları önce yedekleyip uyumluluğu kontrol edin. **Bu JSON dosyası kendiliğinden hesaba uygulanmaz.** `public/_redirects` alternatif hostlar içindir.

Kurallar www → kök alan adı, eski galeri → `/referans/`, eski detaylar → ilgili hizmet satırı ve gerçek 404 davranışını içerir. Bütün adresleri `/index.html` dosyasına 200 ile taşıyan SPA kuralı eklemeyin. Sorgu parametrelerinin korunduğunu doğrulayın. Yerel preview aynı kuralları taklit eder; bu, AWS hesabında uygulanmış oldukları anlamına gelmez.

## 4. Alan adı ve işletme bilgileri

Üretim adresi `https://atiktabela.com` olarak ayarlıdır. Domain management içinde kök alan adı ve www eklenmeli; DNS kayıtları ve SSL sertifikası aktif olmalıdır. HTTP → HTTPS ve www → kök yönlendirmesi canlıda doğrulanmalıdır.

Adres, kullanıcının verdiği Google Haritalar işletme kaydından alınmıştır: Talatpaşa Mahallesi, 1047. Sokak No:19/B, 34513 Esenyurt/İstanbul. İşletme sahibi bunun gerçek posta/uygulama adresiyle ve Google İşletme Profiliyle eşleştiğini doğrulamalıdır. Doğrulanmamış çalışma saatleri, puan veya yorum sayıları şemaya eklenmemiştir.

## 5. Google kurulumu

Search Console'da alan adını DNS ile doğrulayın. Alternatif HTML doğrulamasında verilen token `GOOGLE_SITE_VERIFICATION` derleme değişkenine girilip yeniden derlenebilir. `https://atiktabela.com/sitemap.xml` adresini gönderin; ana sayfa, hizmetler ve referanslar için URL Denetimi yapın. Google İşletme Profilindeki web sitesi adresini aynı alan adına bağlayın. Yapılandırılmış veriyi Rich Results Test ile kontrol edin. Şema, sitemap ve iyi laboratuvar puanı sıralama garantisi değildir.

## 6. Yayın sonrası kontrol

```sh
npm run verify:live -- https://atiktabela.com
```

Komut sekiz sayfayı, robots/sitemap, kalıcı HTTP yönlendirmelerini, gerçek 404'ü ve güvenlik başlıklarını kontrol eder. Yeni sürüm henüz yayınlanmamışsa mevcut canlı alan adı bu sürümü temsil etmez. Amplify preview adresi de parametre olarak verilebilir; korumalı/noindex preview, üretimden ayrı değerlendirilmelidir.

PageSpeed Insights'ta ana sayfa, hizmetler, referanslar ve iletişimi ölçün. Hedefler: LCP ≤2,5 sn, CLS <0,1; yeterli gerçek kullanıcı verisi oluştuğunda INP <200 ms. Yerel laboratuvar ölçümü canlı kullanıcı verisi değildir. Telefon, WhatsApp, form e-posta alanı, harita, mobil menü ve ışık kontrollerini gerçek telefonda deneyin.

## Hesap erişimi gereken işlemler

Amplify platform/yönlendirme ayarı, GitHub dal koruması, DNS/SSL ve Search Console doğrulaması bu oturumda hesap erişimi olmadığı için uygulanmış sayılmaz. Bunlar yayın kılavuzundaki son dış adımlardır.

Resmî kaynaklar: https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html ve https://docs.aws.amazon.com/amplify/latest/userguide/setting-custom-headers.html
