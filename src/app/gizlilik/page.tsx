import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui';
import { site } from '@/config/site';
export const metadata = pageMetadata(
  'Gizlilik ve İletişim Verileri',
  'ATİK TABELA’da iletişim ve teklif formlarının, WhatsApp bağlantılarının ve haritanın nasıl çalıştığını, bilgilerin nasıl aktarıldığını öğrenin.',
  '/gizlilik/',
);
export default function Privacy() {
  return (
    <>
      <PageHero
        label="Gizlilik"
        title="İletişimde şeffaflık."
        text="Bu sitedeki iletişim araçlarının nasıl çalıştığını burada bulabilirsiniz."
      />
      <div className="section container prose">
        <section>
          <h2>İletişim formu</h2>
          <p>
            Formda yazdığınız bilgiler bu site tarafından bir sunucuya kaydedilmez. Form, alanlardan
            bir WhatsApp mesajı oluşturur. WhatsApp bağlantısına tıkladığınızda bilgiler bağlantı
            üzerinden WhatsApp’a aktarılır; mesajı göndermek sizin kontrolünüzdedir.
          </p>
        </section>
        <section>
          <h2>Haritalar ve dış bağlantılar</h2>
          <p>
            İletişim sayfasında Google Haritalar kullanılır. Harita yüklendiğinde Google ile
            bağlantı kurulur. WhatsApp, Google Haritalar ve diğer dış bağlantılar kendi gizlilik
            koşullarına tabidir.
          </p>
        </section>
        <section>
          <h2>Çerez ve analiz araçları</h2>
          <p>
            Bu sitede reklam, ziyaretçi analiz veya pazarlama çerezi entegrasyonu bulunmaz.
            Barındırma hizmeti teknik erişim kayıtları tutabilir.
          </p>
        </section>
        <section>
          <h2>İletişim</h2>
          <p>
            İletişim bilgilerinizle ilgili talepleriniz için{' '}
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp üzerinden bize yazabilirsiniz.
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
