'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { galleryServices } from '@/content/gallery-services';
import { serviceDirectory } from '@/content/service-directory';
import { ServiceOptions } from './service-options';
import { site } from '@/config/site';
export function ContactForm() {
  const [ready, setReady] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState('');
  const group = serviceDirectory.find((group) => group.items.some((item) => item.id === serviceId));
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selected = galleryServices.find((service) => service.id === data.get('service'));
    const message = `Merhaba ATİK TABELA,\nAdım: ${data.get('name')}\nTelefon: ${data.get('phone')}\nE-posta: ${data.get('email') || 'Belirtilmedi'}\nİlgilendiğim çözüm: ${selected?.title || 'Birlikte karar verelim'}\n\n${data.get('message')}`;
    setReady(`${site.whatsapp}?text=${encodeURIComponent(message)}`);
  }
  return (
    <form className="contact-form" onSubmit={submit} onChange={() => setReady(null)}>
      <div className="form-heading">
        <span className="form-index">01 — İLK ADIM</span>
        <h2>Projenizi anlatın.</h2>
        <p>İhtiyacınızı paylaşın, birlikte şekillendirelim.</p>
      </div>
      <div className="form-grid">
        <label>
          Adınız soyadınız <span>*</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Adınız Soyadınız"
            required
            maxLength={100}
          />
        </label>
        <label>
          Telefon numaranız <span>*</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="05XX XXX XX XX"
            required
            minLength={10}
            maxLength={25}
          />
        </label>
        <label>
          E-posta adresiniz
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ornek@firma.com"
            maxLength={150}
          />
        </label>
        <label>
          İlgilendiğiniz çözüm
          <select
            name="service"
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
          >
            <option value="">Birlikte karar verelim</option>
            <ServiceOptions />
          </select>
        </label>
        <label className="full-width">
          Biraz detay paylaşır mısınız? <span>*</span>
          <textarea
            name="message"
            placeholder={
              group
                ? group.preparation
                : 'İhtiyacınızı, varsa ölçü ve adet bilgisini paylaşın. Birlikte netleştirebiliriz.'
            }
            rows={4}
            required
            minLength={10}
            maxLength={2500}
          />
        </label>
      </div>
      {group && (
        <p className="quote-hint" role="status">
          Başlamak için: {group.preparation}
        </p>
      )}
      <p className="form-note">
        Bu form verileri sunucuya kaydetmez. Bilgilerinizle bir WhatsApp mesajı hazırlanır; mesajı
        WhatsApp üzerinden siz gönderirsiniz.
      </p>
      <button type="submit" className="button">
        WhatsApp mesajı hazırla
        <ArrowUpRight size={18} />
      </button>
      {ready && (
        <div className="form-result" role="status">
          <p>Mesajınız hazır. WhatsApp’ı açıp kontrol ederek gönderebilirsiniz.</p>
          <a href={ready} target="_blank" rel="noopener noreferrer" className="text-link">
            WhatsApp’ta aç
            <MessageCircle size={18} />
          </a>
        </div>
      )}
    </form>
  );
}
