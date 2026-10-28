'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Search, Plus } from 'lucide-react';
import { serviceDirectory } from '@/content/service-directory';
import { type GalleryFamily } from '@/content/gallery-services';
import { site } from '@/config/site';
const normalize = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i');
export function ServiceDirectory() {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<GalleryFamily | 'all'>('all');
  useEffect(() => {
    function revealAnchor() {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!id) return;
      setQuery('');
      setFamily('all');
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        const disclosure = target?.closest('details');
        if (disclosure) disclosure.open = true;
        target?.scrollIntoView({ block: 'center' });
      });
    }
    revealAnchor();
    window.addEventListener('hashchange', revealAnchor);
    return () => window.removeEventListener('hashchange', revealAnchor);
  }, []);
  const tokens = normalize(query).trim().split(/\s+/).filter(Boolean);
  const groups = serviceDirectory.flatMap((group) => {
    if (family !== 'all' && group.id !== family) return [];
    const items = group.items.filter((item) =>
      tokens.every((token) =>
        normalize(
          `${group.title} ${item.title} ${item.description} ${item.id === 'sticker' ? 'etiket çıkartma' : ''} ${item.id === 'yazi-kesim' ? 'folyo' : ''} ${item.id === 'matbaa' ? 'baskı' : ''}`,
        ).includes(token),
      ),
    );
    return items.length ? [{ ...group, items }] : [];
  });
  const count = groups.reduce((total, group) => total + group.items.length, 0);
  return (
    <section className="services-directory container" aria-label="Hizmet rehberi">
      <div className="services-controls">
        <div className="services-family-nav" role="group" aria-label="Hizmet grupları">
          {[{ id: 'all', title: 'Tüm hizmetler' }, ...serviceDirectory].map((group) => (
            <button
              key={group.id}
              type="button"
              aria-pressed={family === group.id}
              onClick={() => setFamily(group.id as GalleryFamily | 'all')}
            >
              {group.title}
            </button>
          ))}
        </div>
        <div className="services-search-row">
          <label className="services-search">
            <Search size={19} aria-hidden />
            <span className="sr-only">Hizmet ara</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Hizmet ara: tabela, folyo, kartvizit…"
            />
          </label>
          <span role="status">
            {count} hizmet · {groups.length} grup
          </span>
          {(query || family !== 'all') && (
            <button
              className="services-reset"
              type="button"
              onClick={() => {
                setQuery('');
                setFamily('all');
              }}
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      </div>
      <div id="tabela-reklam" className="service-directory-groups">
        {groups.map((group, index) => (
          <article
            id={`grup-${group.id}`}
            key={group.id}
            className="service-directory-group"
            aria-labelledby={`group-${group.id}`}
          >
            <figure>
              <img
                src={group.image.replace('.webp', '-960.webp')}
                srcSet={`${group.image.replace('.webp', '-480.webp')} 480w, ${group.image.replace('.webp', '-960.webp')} 960w`}
                sizes="(max-width: 760px) 100vw, 45vw"
                alt={group.alt}
                width="960"
                height="640"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <figcaption>{group.caption}</figcaption>
            </figure>
            <div className="service-directory-copy">
              <p className="eyebrow">
                <span />
                {group.title}
              </p>
              <h2 id={`group-${group.id}`}>{group.headline}</h2>
              <p className="service-directory-intro">{group.intro}</p>
              <p className="service-directory-names">
                {group.items.map((item) => item.title).join(' · ')}
              </p>
              <details
                className="service-directory-details"
                key={`${group.id}-${tokens.length > 0}`}
                open={tokens.length > 0 ? true : undefined}
              >
                <summary>
                  {group.items.length} hizmeti incele <Plus size={18} aria-hidden />
                </summary>
                <dl>
                  {group.items.map((item) => {
                    return (
                      <div
                        key={item.id}
                        id={item.id}
                        className="offering-anchor service-directory-item"
                      >
                        <dt>{item.title}</dt>
                        {item.preview && (
                          <dd className="service-item-preview">
                            <Link
                              href={`/referans/?hizmet=${item.id}&ornek=${item.preview.id}`}
                              aria-label={`${item.title} tasarım örneğini incele: ${item.preview.title}`}
                            >
                              <img
                                src={item.preview.image}
                                alt={item.preview.title}
                                width="160"
                                height="120"
                                loading="lazy"
                                decoding="async"
                              />
                              <span aria-hidden>
                                <ArrowUpRight size={14} />
                              </span>
                            </Link>
                          </dd>
                        )}
                        <dd>{item.description}</dd>
                        <dd className="service-item-links">
                          <Link href={`/referans/?hizmet=${item.id}`}>
                            Örnekleri gör <ArrowUpRight size={14} aria-hidden />
                          </Link>
                          <a
                            href={`${site.whatsapp}?text=${encodeURIComponent(`Merhaba, ${item.title} hizmetiniz için bilgi ve teklif almak istiyorum.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Teklif al <ArrowUpRight size={14} aria-hidden />
                          </a>
                        </dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="service-preparation">
                  <strong>Başlamak için</strong>
                  {group.preparation}
                </p>
              </details>
              <Link className="service-group-example" href={`/referans/?kategori=${group.id}`}>
                {group.title} örneklerini gör <ArrowUpRight size={17} aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {groups.length === 0 && (
        <div className="services-empty">
          <h2>Bu aramayla eşleşen hizmet bulunamadı.</h2>
          <p>Daha kısa bir kelime deneyin veya tüm hizmetlere dönün.</p>
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery('');
              setFamily('all');
            }}
          >
            Tüm hizmetleri göster
          </button>
        </div>
      )}
    </section>
  );
}
