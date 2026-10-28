import { pageMetadata } from '@/lib/metadata';
import { Button, Eyebrow, FAQ } from '@/components/ui';
import { site } from '@/config/site';
import { ServiceDirectory } from '@/components/service-directory';

export const metadata = pageMetadata(
  'İstanbul Tabela, Cephe, Baskı ve Kesim Hizmetleri',
  'İstanbul’da ışıklı ve ışıksız tabela, kompozit cephe, sticker, dijital baskı, CNC ve lazer kesim, broşür, kartvizit ve kaşe hizmetlerini inceleyin.',
  '/hizmetler/',
);
const questions = [
  {
    question: 'Hangi hizmeti seçmeliyim?',
    answer:
      'İşletmenizin görünürlüğü için tabela; giriş ve vitrin bütünlüğü için cephe kaplama; cam ve tanıtım yüzeyleri için baskı ve folyo çözümlerini inceleyin. Özel harf ve parçalar için kesim, basılı tanıtım ürünleri için matbaa grubuna bakabilirsiniz. Kararsızsanız alan fotoğrafını veya örnek görselinizi paylaşarak başlayabilirsiniz.',
  },
  {
    question: 'Işıklı mı, ışıksız tabela mı seçmeliyim?',
    answer:
      'Akşam görünürlüğü önemliyse aydınlatmayı değerlendirin. Gündüz kullanılan veya yeterince aydınlatılan alanlarda ışıksız çözümler düşünülebilir. Görüş mesafesi, cephe, elektrik bağlantısı ve bakım erişimi birlikte değerlendirilir.',
  },
  {
    question: 'Teklif için hangi bilgileri göndermeliyim?',
    answer:
      'Tabela ve cephe için alan fotoğrafı ve yaklaşık ölçüler; baskı ve matbaa için ürün türü, ölçü ve adet; kesim için çizim veya örnek görsel, malzeme ve kalınlık başlangıç için yeterlidir. Varsa logo veya tasarım dosyanızı da paylaşın. Eksik bilgileri birlikte netleştirebiliriz.',
  },
  {
    question: 'Baskı veya kesim dosyam hazır değilse ne yapmalıyım?',
    answer:
      'Logonuzu, metinlerinizi ve istediğiniz sonucu anlatan bir örnek paylaşabilirsiniz. Dosyanın üretime uygunluğu, tasarım ihtiyacı, malzeme ve adet teklif öncesinde değerlendirilir. Baskı rengi, kesim çizgisi ve son ölçüler onay aşamasında netleştirilir.',
  },
  {
    question: 'Fiyat ve teslim süresi nasıl belirlenir?',
    answer:
      'Ölçü, adet, malzeme, tasarım hazırlığı ve uygulama koşulları kapsamı etkiler. Montaj, söküm veya saha hazırlığı gerekip gerekmediği de değerlendirilir. Fiyat ve takvim, işin kapsamı netleştirildikten sonra paylaşılır.',
  },
];
export default function Services() {
  return (
    <div className="services-page">
      <header className="services-intro container">
        <div>
          <Eyebrow>Hizmetlerimiz</Eyebrow>
          <h1>
            Markanız için
            <br />
            <em>doğru çözüm.</em>
          </h1>
        </div>
        <div>
          <p>
            Tabeladan kurumsal baskıya; tasarım, üretim ve uygulamayı aynı özenle planlıyoruz.
            İhtiyacınızı seçin, seçenekleri ve örnekleri birlikte inceleyin.
          </p>
          <a href="#service-start" className="service-intro-link">
            Nereden başlayacağınızı bilmiyor musunuz? <span>Birlikte netleştirelim ↗</span>
          </a>
        </div>
      </header>
      <ServiceDirectory />
      <section id="service-start" className="services-start container">
        <div>
          <Eyebrow>Nasıl ilerliyoruz?</Eyebrow>
          <h2>
            İhtiyacınızdan
            <br />
            uygulamaya.
          </h2>
          <p>
            Bir fotoğraf, bir çizim veya bir fikirle başlayın. Gerekli detayları birlikte
            tamamlayalım.
          </p>
          <Button href="/teklif-al/">İhtiyacınızı anlatın</Button>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>İhtiyacı tanıyalım.</h3>
              <p>
                Alanınızı veya ürününüzü; ölçü, adet ve kullanım amacıyla birlikte değerlendirelim.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Detayları netleştirelim.</h3>
              <p>
                Tasarım, malzeme ve üretim seçeneklerini belirleyip teklif ve takvimi paylaşalım.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Onayla üretime geçelim.</h3>
              <p>
                Onaylanan kapsamı üretelim; işe göre teslimat veya montaj adımlarını planlayalım.
              </p>
            </div>
          </li>
        </ol>
      </section>
      <FAQ items={questions} />
      <section className="container cta">
        <div>
          <Eyebrow>Birlikte başlayalım</Eyebrow>
          <h2>
            İhtiyacınızı anlatın.
            <br />
            <em>Detayları planlayalım.</em>
          </h2>
        </div>
        <div>
          <p>
            Alan fotoğrafınızı veya tasarımınızı; yaklaşık ölçü ve adet bilgisiyle paylaşın. Size
            uygun üretim ve uygulama seçeneklerini birlikte netleştirelim.
          </p>
          <Button
            href={`${site.whatsapp}?text=${encodeURIComponent('Merhaba, hizmetleriniz hakkında bilgi ve teklif almak istiyorum.')}`}
            external
          >
            WhatsApp’tan yazın
          </Button>
        </div>
      </section>
    </div>
  );
}
