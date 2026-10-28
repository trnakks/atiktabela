import { pageMetadata } from '@/lib/metadata';
import { CTA, Eyebrow } from '@/components/ui';
import { ExampleGallery } from '@/components/example-gallery';
import { galleryExamples } from '@/content/gallery';
export const metadata = pageMetadata(
  'Referanslarımız',
  'Atik Tabela uygulamalarından tabela, kompozit cephe, LED neon, vitrin baskısı ve özel kesim örnekleri. Işıklı tabelaları açıp kapatarak inceleyin.',
  '/referans/',
);
export default function Gallery() {
  return (
    <div className="gallery-page">
      <section className="container gallery-intro">
        <Eyebrow>Referanslarımız</Eyebrow>
        <h1>
          Markanıza uygun <em>uygulamayı bulun.</em>
        </h1>
        <p>
          Tabela, cephe, baskı ve kesim örneklerini keşfedin. Görselleri büyütün; ışıklı
          uygulamalarda ışığı açıp kapatarak karşılaştırın.
        </p>
      </section>
      <section className="container gallery-section" aria-label="Uygulama seçkisi">
        <div className="design-gallery">
          <ExampleGallery />
        </div>
      </section>
      <nav className="container reference-archive" aria-label="Referans arşivi">
        <details>
          <summary>Tüm referanslara hızlı erişim ({galleryExamples.length})</summary>
          <ul>
            {galleryExamples.map((example) => (
              <li key={example.id}>
                <a href={`/referans/?ornek=${example.id}`}>{example.title}</a>
              </li>
            ))}
          </ul>
        </details>
      </nav>
      <CTA />
    </div>
  );
}
