import { pageMetadata } from '@/lib/metadata';
import { ArrowUpRight, MapPin, Phone, MessageCircle } from 'lucide-react';
import { PageHero, Eyebrow, FAQ } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
import { site } from '@/config/site';
export const metadata = pageMetadata(
  'İletişim',
  'ATİK TABELA ile projenizi konuşun. Telefon, WhatsApp ve konum bilgileriyle bize ulaşın; ihtiyacınıza uygun çözümleri birlikte planlayalım.',
  '/iletisim/',
);
const channels = [
  { label: 'Bizi arayın', value: site.phone, href: site.phoneHref, Icon: Phone },
  {
    label: 'İkinci telefon',
    value: site.secondaryPhone,
    href: site.secondaryPhoneHref,
    Icon: Phone,
  },
  {
    label: 'Bir mesaj bırakın',
    value: 'WhatsApp ile iletişim',
    href: site.whatsapp,
    Icon: MessageCircle,
  },
  { label: 'Yolunuz düşsün', value: 'Adres ve Yol Tarifi', href: site.map, Icon: MapPin },
];
export default function Contact() {
  return (
    <>
      <PageHero
        label="İletişim"
        title="Güzel işler,"
        accent="bir merhabayla başlar."
        text="Tabela, cephe, baskı, kesim veya matbaa ihtiyacınızı paylaşın. Fotoğraf, çizim, yaklaşık ölçü ve adet bilgisiyle başlayabiliriz."
      />
      <section className="container contact-channels">
        {channels.map(({ label, value, href, Icon }) => (
          <a
            className="contact-channel"
            href={href}
            key={label}
            {...(href.startsWith('https') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon size={24} strokeWidth={1.4} />
            <span>{label}</span>
            <strong>{value}</strong>
            <ArrowUpRight className="channel-arrow" size={18} />
          </a>
        ))}
      </section>
      <section className="section container contact-layout">
        <ContactForm />
        <aside className="contact-aside">
          <Eyebrow>Doğru yerdesiniz</Eyebrow>
          <h2>
            Önce tanışalım.
            <br />
            <em>Sonra tasarlayalım.</em>
          </h2>
          <p>
            Hangi hizmetin uygun olduğundan emin olmanız gerekmiyor. Kullanım alanını ve
            ihtiyacınızı anlatmanız yeterli.
          </p>
          <div className="preparation">
            <h3>Görüşme öncesi küçük bir hazırlık</h3>
            <ul>
              <li>Alan fotoğrafı, ürün örneği veya çizim</li>
              <li>Varsa yaklaşık ölçü, adet ve malzeme tercihi</li>
              <li>Logo dosyanız veya beğendiğiniz örnekler</li>
              <li>Teslimat veya montaj ihtiyacı</li>
            </ul>
            <span>Fotoğrafları WhatsApp sohbetinde ayrıca ekleyebilirsiniz.</span>
          </div>
          <a className="direct-phone" href={site.phoneHref}>
            <span>Doğrudan konuşmayı tercih ederseniz</span>
            <strong>
              {site.phone}
              <ArrowUpRight size={22} />
            </strong>
          </a>
        </aside>
      </section>
      <section className="container map-section">
        <div className="map-heading">
          <div>
            <Eyebrow>Adres ve Yol Tarifi</Eyebrow>
            <h2>Bir kahveye bekleriz.</h2>
          </div>
          <a href={site.map} target="_blank" rel="noopener noreferrer" className="text-link">
            Google Haritalar’da aç
            <ArrowUpRight size={18} />
          </a>
        </div>
        <address className="business-address">
          <strong>{site.name}</strong>
          <span>
            {site.address.streetAddress}, {site.address.postalCode} {site.address.district} /{' '}
            {site.address.city}
          </span>
          <span>İstanbul bölgesinde hizmet veriyoruz.</span>
        </address>
        <div className="map-frame">
          <iframe
            src={site.mapEmbed}
            title="ATİK TABELA konumu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
      <FAQ />
    </>
  );
}
