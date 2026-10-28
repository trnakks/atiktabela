'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { galleryServices } from '@/content/gallery-services';
import { serviceDirectory } from '@/content/service-directory';
import { galleryExamples } from '@/content/gallery';
import { ServiceOptions } from './service-options';
import { ExampleMedia } from './example-media';
import Link from 'next/link';
import { site } from '@/config/site';

export function QuoteBuilder() {
  const [serviceSlug, setServiceSlug] = useState('');
  const [lightOn, setLightOn] = useState(true);
  const [fields, setFields] = useState({
    name: '',
    business: '',
    location: '',
    dimensions: '',
    note: '',
    quantity: '',
    material: '',
    thickness: '',
  });
  const service = galleryServices.find((item) => item.id === serviceSlug);
  const group = serviceDirectory.find((group) => group.id === service?.family);
  const previewId = group?.items.find((item) => item.id === serviceSlug)?.preview?.id;
  const example = galleryExamples.find((item) => item.id === previewId);
  const isCut = service?.family === 'kesim';
  const needsQuantity = isCut || service?.family === 'baski' || service?.family === 'matbaa';
  const valid = fields.name.trim().length >= 2;
  const message = [
    `Merhabalar, ben ${fields.name.trim() || '[adınız]'}.`,
    service
      ? `İşletmem için ${service.title.toLocaleLowerCase('tr-TR')} hizmetiniz hakkında bilgi ve teklif almak istiyorum.`
      : 'İşletmem için uygun hizmeti birlikte belirleyip teklif almak isterim.',
    '',
    fields.business.trim() && `İşletme: ${fields.business.trim()}`,
    fields.location.trim() && `Uygulama yeri: ${fields.location.trim()}`,
    fields.dimensions.trim() && `Yaklaşık ölçü: ${fields.dimensions.trim()}`,
    needsQuantity && fields.quantity.trim() && `Adet: ${fields.quantity.trim()}`,
    isCut && fields.material.trim() && `Malzeme: ${fields.material.trim()}`,
    isCut && fields.thickness.trim() && `Kalınlık: ${fields.thickness.trim()}`,
    fields.note.trim() && `Not: ${fields.note.trim()}`,
    '',
    group
      ? `Paylaşabileceğim bilgiler: ${group.preparation}`
      : 'Fotoğraf, logo veya tasarım dosyamı bu sohbetten paylaşabilirim.',
  ]
    .filter((line): line is string => typeof line === 'string')
    .filter((line, index, lines) => line !== '' || (index > 0 && lines[index - 1] !== ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');

  function update(field: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid) document.getElementById('quote-name')?.focus();
  }

  return (
    <div className="quote-layout">
      <form id="quote-form" className="quote-form" onSubmit={submit}>
        <fieldset>
          <legend>
            <span>01</span> Hangi hizmetle ilgileniyorsunuz?
          </legend>
          <label htmlFor="quote-service" className="quote-label">
            Hizmet seçimi
          </label>
          <select
            id="quote-service"
            value={serviceSlug}
            onChange={(event) => {
              setServiceSlug(event.target.value);
              setLightOn(true);
            }}
          >
            <option value="">Birlikte karar verelim</option>
            <ServiceOptions />
          </select>
          <p className="quote-hint">Emin değilseniz seçim yapmadan devam edebilirsiniz.</p>
        </fieldset>
        <fieldset>
          <legend>
            <span>02</span> Sizi ve projenizi tanıyalım.
          </legend>
          <div className="quote-fields">
            <label htmlFor="quote-name">
              Adınız soyadınız <span aria-hidden="true">*</span>
              <input
                id="quote-name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="Adınız Soyadınız"
                value={fields.name}
                onChange={(event) => update('name', event.target.value)}
              />
            </label>
            <label>
              İşletme adı <span className="optional">İsteğe bağlı</span>
              <input
                name="business"
                autoComplete="organization"
                maxLength={120}
                placeholder="İşletmenizin adı"
                value={fields.business}
                onChange={(event) => update('business', event.target.value)}
              />
            </label>
            <label>
              {needsQuantity ? 'Kullanım / teslim yeri' : 'Uygulama yeri'}{' '}
              <span className="optional">İsteğe bağlı</span>
              <input
                name="location"
                maxLength={160}
                placeholder={
                  needsQuantity
                    ? 'Örn. İstanbul, ofis / ürün ambalajı'
                    : 'Örn. İstanbul, mağaza cephesi'
                }
                value={fields.location}
                onChange={(event) => update('location', event.target.value)}
              />
            </label>
            <label>
              Yaklaşık ölçü <span className="optional">İsteğe bağlı</span>
              <input
                name="dimensions"
                maxLength={100}
                placeholder={
                  isCut
                    ? 'Örn. 40 × 60 cm'
                    : needsQuantity
                      ? 'Örn. 8,5 × 5,5 cm veya A4'
                      : 'Örn. 300 × 80 cm veya bilmiyorum'
                }
                value={fields.dimensions}
                onChange={(event) => update('dimensions', event.target.value)}
              />
            </label>
            {needsQuantity && (
              <label>
                Adet <span className="optional">İsteğe bağlı</span>
                <input
                  name="quantity"
                  inputMode="numeric"
                  maxLength={40}
                  placeholder="Örn. 500 adet"
                  value={fields.quantity}
                  onChange={(event) => update('quantity', event.target.value)}
                />
              </label>
            )}
            {isCut && (
              <>
                <label>
                  Malzeme <span className="optional">İsteğe bağlı</span>
                  <input
                    name="material"
                    maxLength={80}
                    placeholder="Örn. pleksi, kompozit; birlikte seçebiliriz"
                    value={fields.material}
                    onChange={(event) => update('material', event.target.value)}
                  />
                </label>
                <label>
                  Kalınlık <span className="optional">İsteğe bağlı</span>
                  <input
                    name="thickness"
                    maxLength={40}
                    placeholder="Örn. 3 mm"
                    value={fields.thickness}
                    onChange={(event) => update('thickness', event.target.value)}
                  />
                </label>
              </>
            )}
            <label className="full-width">
              Kısaca ihtiyacınız <span className="optional">İsteğe bağlı</span>
              <textarea
                name="note"
                rows={3}
                maxLength={1200}
                placeholder={group?.preparation || 'Aklınızdaki işi ve kullanım amacını paylaşın.'}
                value={fields.note}
                onChange={(event) => update('note', event.target.value)}
              />
            </label>
          </div>
          <p className="quote-hint">
            Yalnızca adınız gerekli. Fotoğraf ve logonuzu WhatsApp sohbetinde ekleyebilirsiniz.
          </p>
        </fieldset>
      </form>
      <aside className="quote-preview" aria-label="Tasarım ve mesaj önizlemesi">
        <div className="quote-design">
          {service && example ? (
            <div className="quote-service-preview">
              <div className="example-visual">
                <ExampleMedia
                  key={service.id}
                  example={example}
                  lightOn={lightOn}
                  onLightChange={setLightOn}
                />
              </div>
              <div className="quote-service-caption">
                <strong>{service.title}</strong>
                <Link href={'/referans/?hizmet=' + service.id + '&ornek=' + example.id}>
                  Referansı incele <ArrowUpRight size={14} aria-hidden />
                </Link>
              </div>
              <p className="quote-hint">{group?.preparation}</p>
            </div>
          ) : (
            <div className="quote-empty">
              <MessageCircle size={28} strokeWidth={1.3} aria-hidden />
              <h2>Birlikte şekillendirelim.</h2>
              <p>Hizmet seçtiğinizde örnek tasarım burada görünür.</p>
            </div>
          )}
        </div>
        <div className="quote-message">
          <p className="eyebrow">03 / Mesajınız hazır</p>
          <h2>İlk merhaba sizden.</h2>
          <p className="quote-message-text" aria-label="Hazır WhatsApp mesajı">
            {message}
          </p>
          {valid ? (
            <a
              className="button"
              href={`${site.whatsapp}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp’ta mesajı aç <ArrowUpRight size={18} aria-hidden />
            </a>
          ) : (
            <button className="button" type="submit" form="quote-form">
              WhatsApp’ta mesajı aç <ArrowUpRight size={18} aria-hidden />
            </button>
          )}
          <p className="quote-hint">
            Bilgileriniz siteye kaydedilmez. Mesajı WhatsApp’ta kontrol edip siz gönderirsiniz.
          </p>
        </div>
      </aside>
    </div>
  );
}
