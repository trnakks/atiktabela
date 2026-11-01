import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { ArrowUpRight, Asterisk } from 'lucide-react';
import { Button, Eyebrow, FAQ, SectionTitle } from '@/components/ui';
import { FacadeVisual } from '@/components/facade-visual';
import { serviceDirectory } from '@/content/service-directory';
import { galleryExamples } from '@/content/gallery';
import { ExampleCard } from '@/components/example-gallery';
import { site } from '@/config/site';

export const metadata = pageMetadata(
  'İstanbul Tabela Üretimi ve Montajı | ATİK TABELA',
  site.description,
  '/',
);
const featured = ['sahane-altin-harf', 'burgerslak-vitrin', 'ref-century21'].map((id) =>
  galleryExamples.find((example) => example.id === id)!,
);
const questions = [
  {
    question: 'Teklif almak için ne göndermeliyim?',
    answer:
      'Tabela ve cephe için alan fotoğrafı ve yaklaşık ölçüler; baskı ve matbaa için ürün türü, ölçü ve adet; kesim için çizim veya örnek görsel paylaşabilirsiniz. Varsa logonuzu da ekleyin. Eksik detayları birlikte tamamlayabiliriz.',
  },
  {
    question: 'Hangi hizmetin uygun olduğundan emin değilim.',
    answer:
      'Kullanım alanınızı ve ulaşmak istediğiniz sonucu anlatın. Beğendiğiniz tasarım örneğini de paylaşabilirsiniz. Malzeme, ışık, ölçü ve üretim seçeneklerini ihtiyacınıza göre birlikte değerlendirelim.',
  },
  {
    question: 'Fiyat ve teslim süresi nasıl belirlenir?',
    answer:
      'Ölçü, adet, malzeme, tasarım hazırlığı ve uygulama koşulları fiyatı ve takvimi etkiler. Söküm veya montaj gerekiyorsa bunlar da kapsama eklenir. İşin detayları netleştiğinde teklif ve teslim planı paylaşılır.',
  },
];
export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero container">
        <div className="hero-copy">
          <Eyebrow>Tabela • Tasarım • Üretim</Eyebrow>
          <h1>
            İşletmenize Özel Tabela Üretimi ve Montajı
          </h1>
          <p>
            Tabeladan cepheye, vitrin grafiğinden kurumsal baskıya. Markanızı doğru malzeme, özenli
            tasarım ve yerinde uygulamayla görünür kılalım.
          </p>
          <div className="hero-actions">
            <Button href="/hizmetler/">Çözümleri keşfedin</Button>
            <Link prefetch={false} href="/teklif-al/" className="hero-text-link">
              Projenizi anlatın <ArrowUpRight size={17} aria-hidden />
            </Link>
          </div>
          <div className="hero-bottom">
            <span>
              <span className="status-dot" />
              Bir fotoğraf veya fikirle başlayabiliriz.
            </span>
            <a href="#cozumler" aria-label="Hizmet gruplarına ilerle">
              ↓
            </a>
          </div>
        </div>
        <div className="hero-art">
          <FacadeVisual priority />
          <div className="art-caption">
            <span>ATİK / CEPHE KONSEPTİ</span>
            <Asterisk size={19} aria-hidden />
            <span>Malzeme, harf ve ışık.</span>
          </div>
        </div>
      </section>
      <section className="section container home-solutions" id="cozumler">
        <SectionTitle
          label="Ne yapıyoruz?"
          title="Bir marka, birçok yüzey."
          text="İhtiyacınıza uygun hizmeti seçin. İlgili uygulamaları ve tasarım seçeneklerini yakından inceleyin."
        />
        <div className="home-service-groups">
          {serviceDirectory.map((group, index) => (
            <Link
              prefetch={false}
              key={group.id}
              href={`/hizmetler/#grup-${group.id}`}
              className="home-service-group"
            >
              <div className="home-service-image">
                <img
                  src={group.image.replace('.webp', '-480.webp')}
                  alt={group.alt}
                  width="480"
                  height="320"
                  loading="lazy"
                />
                <span>0{index + 1}</span>
              </div>
              <div className="home-service-label">
                <h3>{group.title}</h3>
                <ArrowUpRight size={18} aria-hidden />
              </div>
              <p>
                {group.items
                  .slice(0, 3)
                  .map((item) => item.title)
                  .join(' · ')}
              </p>
            </Link>
          ))}
        </div>
        <div className="section-footer">
          <span>Tasarım, üretim ve uygulama; ihtiyacınıza göre.</span>
          <Button href="/hizmetler/" secondary>
            Tüm hizmetler
          </Button>
        </div>
      </section>
      <section className="section container home-examples">
        <SectionTitle
          label="Referanslarımız"
          title="Farklı ihtiyaçlar, aynı özen."
          text="Bir mağazanın ışıklı harfleri, bir restoranın vitrin grafiği ve bir ofisin marka kimliği. Kendi işletmeniz için fikir edinin."
        />
        <div className="examples-grid">
          {featured.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
        <div className="section-footer">
          <span>
            {galleryExamples.length} referansı keşfedin; ışıklı uygulamalarda ışığı açıp kapatarak
            karşılaştırın.
          </span>
          <Button href="/referans/" secondary>
            Tüm referanslarımız
          </Button>
        </div>
      </section>
      <section className="home-approach">
        <div className="container">
          <div>
            <Eyebrow>ATİK yaklaşımı</Eyebrow>
            <h2>
              Markanızla uyumlu.
              <br />
              <em>Detayına kadar düşünülmüş.</em>
            </h2>
          </div>
          <div>
            <p>
              Bir cephede uzaktan okunabilirlik, bir vitrinde mesajın netliği, bir kartvizitte ilk
              temas. Her yüzeyin ihtiyacını ayrı değerlendirir; renk, malzeme ve tasarım dilini
              birlikte planlarız.
            </p>
            <Link prefetch={false} href="/hakkimizda/" className="text-link">
              Bizi tanıyın <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container home-process">
        <SectionTitle label="Nasıl ilerliyoruz?" title="Fikirden üretime, birlikte." />
        <ol>
          {[
            [
              'İhtiyacınızı anlatın.',
              'Fotoğraf, çizim veya örnek paylaşın. Kullanım alanı, ölçü ve adetle başlayalım.',
            ],
            [
              'Detayları netleştirelim.',
              'Tasarım, malzeme ve uygulama kapsamını belirleyip teklif ve takvimi paylaşalım.',
            ],
            [
              'Onayla hayata geçirelim.',
              'Onaylanan çalışmayı üretelim; işe göre teslimat veya montajı planlayalım.',
            ],
          ].map(([title, text], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <Link prefetch={false} href="/surecimiz/" className="text-link">
          Çalışma sürecini incele <ArrowUpRight size={16} aria-hidden />
        </Link>
      </section>
      <FAQ items={questions} />
      <section className="container cta">
        <div>
          <Eyebrow>Birlikte başlayalım</Eyebrow>
          <h2>
            Fikrinizi paylaşın.
            <br />
            <em>Detayları planlayalım.</em>
          </h2>
        </div>
        <div>
          <p>
            Alan fotoğrafınızı veya tasarımınızı; yaklaşık ölçü ve adet bilgisiyle gönderin.
            İhtiyacınıza uygun seçenekleri birlikte netleştirelim.
          </p>
          <Button
            href={`${site.whatsapp}?text=${encodeURIComponent('Merhaba, projem için bilgi ve teklif almak istiyorum.')}`}
            external
          >
            WhatsApp’tan yazın
          </Button>
        </div>
      </section>
    </div>
  );
}
