import { pageMetadata } from '@/lib/metadata';
import { CTA, FAQ, PageHero, Process, Eyebrow } from '@/components/ui';
import { scopeChecklist } from '@/content/examples';
export const metadata = pageMetadata(
  'Çalışma Sürecimiz',
  'Tabela, cephe, baskı, kesim ve matbaa için ATİK TABELA’nın tasarım, teklif, üretim ve teslim sürecini inceleyin. İşinizin kapsamını birlikte netleştirelim.',
  '/surecimiz/',
);
export default function Workflow() {
  return (
    <>
      <PageHero
        label="Çalışma sürecimiz"
        title="İlk fikirden,"
        accent="son detaya kadar."
        text="Doğru sorularla başlayan, açık iletişimle ilerleyen ve uygulama detaylarıyla tamamlanan bir süreç."
      />
      <Process />
      <section className="section container">
        <div className="project-brief">
          <div>
            <Eyebrow>Uygulama öncesi</Eyebrow>
            <h2>
              Son bir kez
              <br />
              <em>aynı detaya bakalım.</em>
            </h2>
          </div>
          <div>
            <p>
              Üretim öncesinde metin, logo, kesin ölçü, adet ve malzeme kontrol edilir. Baskıda renk
              ve katlama; kesimde çizim ve kalınlık; tabelada ışık ve montaj detayları onaylanan
              çalışmayla birlikte değerlendirilir.
            </p>
            <p>
              Yaklaşık ölçüler üretim ölçüsü değildir. Teslimat, paketleme ve varsa söküm, enerji
              bağlantısı ve saha erişimi teklif kapsamında netleştirilir. Takvim bu bilgilere göre
              paylaşılır.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <Eyebrow>Teklif kontrol listesi</Eyebrow>
        <h2 className="mb-heading">Aynı kapsamı konuştuğumuzdan emin olalım.</h2>
        <div className="scope-grid">
          {scopeChecklist.map((item, i) => (
            <div key={item.title}>
              <span>0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <p className="visual-note">
          Bu liste kontrol amacı taşır. Dahil olan işler ve teslim koşulları projenizin teklifinde
          ayrıca belirtilir.
        </p>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
