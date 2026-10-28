import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { galleryFamilies } from '@/content/gallery-services';
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link prefetch={false} href="/" className="wordmark">
              ATİK
              <span>
                TABELA<span className="brand-dot">.</span>
              </span>
            </Link>
            <p>
              Bir tabeladan fazlası.
              <br />
              Markanızın ilk izlenimi.
            </p>
            <div className="social-links">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a href={site.phoneHref} aria-label="Telefon">
                <Phone size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3>Keşfedin</h3>
            <Link prefetch={false} href="/hakkimizda/">
              Hakkımızda
            </Link>
            <Link prefetch={false} href="/referans/">
              Referanslarımız
            </Link>
            <Link prefetch={false} href="/surecimiz/">
              Çalışma sürecimiz
            </Link>
            <Link prefetch={false} href="/iletisim/">
              İletişim
            </Link>
          </div>
          <div>
            <h3>Çözümlerimiz</h3>
            {galleryFamilies.map((s) => (
              <Link prefetch={false} href={`/hizmetler/#grup-${s.id}`} key={s.id}>
                {s.title}
              </Link>
            ))}
          </div>
          <div className="footer-contact">
            <h3>Bir merhaba deyin</h3>
            <a href={site.phoneHref} className="footer-phone">
              {site.phone}
            </a>
            <a href={site.secondaryPhoneHref} aria-label={`İkinci telefon: ${site.secondaryPhone}`}>
              İkinci telefon: {site.secondaryPhone}
            </a>
            <a href={site.map} target="_blank" rel="noopener noreferrer">
              Adres ve Yol Tarifi <ArrowUpRight size={15} />
            </a>
            <address className="footer-address">
              {site.address.streetAddress}
              <br />
              {site.address.postalCode} {site.address.district} / {site.address.city}
            </address>
            <span className="footer-note">
              Görüşme ve uygulama planlaması için
              <br />
              bizimle iletişime geçebilirsiniz.
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ATİK TABELA. Tüm hakları saklıdır.</span>
          <Link prefetch={false} href="/gizlilik/">
            Gizlilik
          </Link>
          <span>
            Designed by{' '}
            <a href={site.designer.url} target="_blank" rel="noopener noreferrer">
              {site.designer.name}
              <ArrowUpRight size={12} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
