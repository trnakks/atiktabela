import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { pageMetadata } from '@/lib/metadata';
import { Button, Eyebrow } from '@/components/ui';
import { galleryFamilies } from '@/content/gallery-services';
import { site } from '@/config/site';

export const metadata = pageMetadata(
  'Hakkımızda',
  '1985’te Kars’ta başlayan iş geçmişimizden bugüne. ATİK TABELA olarak İstanbul’da tabela, cephe, baskı, kesim ve matbaa çözümleri sunuyoruz.',
  '/hakkimizda/',
);

export default function About() {
  return (
    <div className="about-page">
      <header className="container about-intro">
        <div>
          <Eyebrow>ATİK TABELA · 1985’ten bugüne</Eyebrow>
          <h1>
            Kars’ta başlayan emek.
            <br />
            <em>İstanbul’da iz bırakan işler.</em>
          </h1>
        </div>
        <p>
          1985’te Kars’ta başlayan iş geçmişimizi, bugün İstanbul’da markaların görünür dünyasını
          tasarlarken yanımızda taşıyoruz. Her işte aynı özenle: doğru malzeme, anlaşılır tasarım ve
          temiz uygulama.
        </p>
      </header>
      <section className="container about-story" aria-labelledby="story-title">
        <div className="about-year-panel">
          <span>HİKÂYEMİZİN BAŞLANGICI</span>
          <strong>1985</strong>
          <div>
            <span>Kars’tan</span>
            <span aria-hidden>↗</span>
            <span>İstanbul’a</span>
          </div>
          <p>
            Değişen yüzeyler.
            <br />
            Süren emek.
          </p>
        </div>
        <div className="about-story-copy">
          <Eyebrow>Hikâyemiz</Eyebrow>
          <h2 id="story-title">
            Bir işin değeri,
            <br />
            gösterilen özende.
          </h2>
          <p>
            Bizim için bir tabela, bir işletmenin adını taşır; o adın arkasındaki emeği de görünür
            kılar. 1985’te Kars’ta başlayan yolculuğumuzu bugün de bu düşünceyle sürdürüyoruz.
          </p>
          <p>
            Malzemeler, üretim yöntemleri ve markaların ihtiyaçları değişiyor. Biz her yeni
            çalışmada işin özüne dönüyoruz: Nerede kullanılacak? Nasıl okunacak? Markayı nasıl
            temsil edecek? Bir cepheyi de bir kartviziti de bu sorularla ele alıyoruz.
          </p>
          <p>
            Bugün ATİK TABELA olarak İstanbul bölgesinde hizmet veriyor; tabela, cephe kaplama,
            baskı, folyo, kesim ve matbaa ihtiyaçlarını tasarımdan üretime, işin kapsamına göre
            uygulamaya kadar birlikte planlıyoruz.
          </p>
          <Link href="/hizmetler/" className="text-link">
            Hizmetlerimizi inceleyin <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
      <section className="about-location-band">
        <div className="container">
          <div>
            <MapPin size={22} aria-hidden />
            <h2>Bugün İstanbul’dayız.</h2>
          </div>
          <p>
            Mağazanız, ofisiniz veya markanız için ihtiyacınıza uygun çözümü birlikte belirleyelim.
            Alanı, ölçüleri ve uygulama koşullarını değerlendirerek başlayalım.
          </p>
          <Link href="/iletisim/" className="text-link">
            İletişim ve yol tarifi <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
      <section className="container about-principles" aria-labelledby="principles-title">
        <Eyebrow>Çalışma anlayışımız</Eyebrow>
        <h2 id="principles-title">Her ayrıntıda aynı özen.</h2>
        <div>
          {[
            [
              '01',
              'Markayı anlayan tasarım',
              'Yazıyı, rengi ve ölçeği birlikte düşünürüz. Bir tabelada okunabilirliği, bir baskıda mesajın netliğini, her çalışmada markanızın karakterini önemseriz.',
            ],
            [
              '02',
              'Kullanıma uygun malzeme',
              'Yüzeyi, iç veya dış mekân koşullarını ve beklenen görünümü değerlendiririz. Malzeme ve üretim seçeneklerini işin ihtiyacına göre belirleriz.',
            ],
            [
              '03',
              'Baştan açık bir süreç',
              'Ölçü, adet, tasarım ve uygulama kapsamını birlikte netleştiririz. Teklif ve takvimi paylaşır; onaylanan çalışma üzerinden üretim ve teslim adımlarını planlarız.',
            ],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container about-work" aria-labelledby="work-title">
        <div className="about-work-copy">
          <Eyebrow>Markanızın her yüzünde</Eyebrow>
          <h2 id="work-title">
            Bir cepheden
            <br />
            elde kalan bir izlenime.
          </h2>
          <p>
            Işıklı harflerden vitrin yazılarına, özel kesim parçalardan kartvizit ve broşüre kadar;
            markanızın farklı yüzeylerde aynı dili konuşmasını önemsiyoruz.
          </p>
          <nav className="about-service-links" aria-label="Hizmet alanlarımız">
            {galleryFamilies.map((group) => (
              <Link key={group.id} href={`/hizmetler/#grup-${group.id}`}>
                {group.title}
                <ArrowUpRight size={15} aria-hidden />
              </Link>
            ))}
          </nav>
          <Button href="/referans/" secondary>
            Referanslarımızı keşfedin
          </Button>
        </div>
        <div className="about-work-images">
          <figure>
            <img
              src="/images/referans-boranoglu-960.webp"
              alt="Boranoğlu satış ofisi için altın tonlu harf tasarım örneği"
              width="960"
              height="640"
              loading="lazy"
            />
            <figcaption>Boranoğlu</figcaption>
          </figure>
          <figure>
            <img
              src="/images/referans-yurtici-960.webp"
              alt="Yurtiçi Kargo şubesi için ışıklı tabela tasarım örneği"
              width="960"
              height="640"
              loading="lazy"
            />
            <figcaption>Yurtiçi Kargo</figcaption>
          </figure>
        </div>
      </section>
      <section className="container about-next">
        <div>
          <Eyebrow>Birlikte başlayalım</Eyebrow>
          <h2>
            Yeni hikâyenizde
            <br />
            <em>bizim de emeğimiz olsun.</em>
          </h2>
          <p>
            Bir fotoğraf, bir çizim veya bir fikir paylaşın. İhtiyacınızı dinleyip uygun seçenekleri
            birlikte netleştirelim.
          </p>
        </div>
        <div className="about-next-actions">
          <Button href="/iletisim/">Bizimle iletişime geçin</Button>
          <Button
            href={`${site.whatsapp}?text=${encodeURIComponent('Merhaba, işletmem için hizmetleriniz hakkında bilgi almak istiyorum.')}`}
            secondary
            external
          >
            WhatsApp’tan yazın
          </Button>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
      </section>
    </div>
  );
}
