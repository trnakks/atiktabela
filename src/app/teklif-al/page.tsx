import { pageMetadata } from '@/lib/metadata';
import { QuoteBuilder } from '@/components/quote-builder';

export const metadata = pageMetadata(
  'Teklif Al',
  'Tabela, cephe, baskı, kesim veya matbaa hizmetinizi seçin. Ölçü ve adet bilgileriyle ATİK TABELA’ya WhatsApp teklif mesajınızı hazırlayın.',
  '/teklif-al/',
);
export default function QuotePage() {
  return (
    <section className="section container quote-page">
      <div className="quote-heading">
        <p className="eyebrow">Teklif al</p>
        <h1>
          Bir fikirle <em>başlayalım.</em>
        </h1>
        <p>
          Hizmetinizi seçin, projenizi kısaca anlatın. Mesajınızı WhatsApp’ta birlikte
          netleştirelim.
        </p>
      </div>
      <QuoteBuilder />
    </section>
  );
}
