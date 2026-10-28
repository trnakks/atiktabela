'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, RotateCcw, Search } from 'lucide-react';
import type { SignExample } from '@/content/examples';
import {
  galleryExamples,
  enrichExample,
  matchesExample,
  emptyGalleryFilters,
  type GalleryExample,
  type GalleryFilters,
} from '@/content/gallery';
import { galleryFamilies, galleryAudiences, galleryServices } from '@/content/gallery-services';
import { exampleQuoteUrl } from '@/lib/gallery-links';
import { ExampleMedia } from './example-media';

const ExampleDialog = dynamic(() => import('./example-dialog'), { ssr: false });
export const GALLERY_PAGE_SIZE = 12;

export function ExampleCard({
  example,
  onOpen,
  eager = false,
}: {
  example: SignExample;
  onOpen?: (example: GalleryExample, lightOn: boolean) => void;
  eager?: boolean;
}) {
  const item = enrichExample(example);
  const [lightOn, setLightOn] = useState(true);
  const [localOpen, setLocalOpen] = useState(false);
  function inspect() {
    if (onOpen) onOpen(item, lightOn);
    else setLocalOpen(true);
  }
  const tags = galleryServices.filter((service) => item.serviceIds.includes(service.id));
  return (
    <article className={'example-card example-' + item.id}>
      <ExampleMedia
        example={item}
        lightOn={lightOn}
        onLightChange={setLightOn}
        onInspect={inspect}
        eager={eager}
      />
      <div className="example-body">
        <div className="example-tags" aria-label="Uygulama hizmetleri">
          {tags.slice(0, 2).map((tag) => (
            <span key={tag.id}>{tag.title}</span>
          ))}
        </div>
        <h3>
          <button type="button" onClick={inspect}>
            {item.title}
          </button>
        </h3>
        <div className="example-card-actions">
          <button type="button" className="example-inspect" onClick={inspect}>
            İncele
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          <a
            className="example-quote"
            href={exampleQuoteUrl(item)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.title + ': benzerini yaptır'}
          >
            Benzerini yaptır
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
      {localOpen && (
        <ExampleDialog
          example={item}
          initialLightOn={lightOn}
          onClose={() => setLocalOpen(false)}
        />
      )}
    </article>
  );
}

type Selection = { id: string; lightOn: boolean } | null;
function readLocation() {
  const p = new URLSearchParams(window.location.search);
  const family = p.get('kategori') ?? '';
  const audience = p.get('isletme') ?? '';
  const service = p.get('hizmet') ?? '';
  return {
    filters: {
      family: galleryFamilies.some((x) => x.id === family) ? family : '',
      audience: galleryAudiences.some((x) => x.id === audience) ? audience : '',
      service: galleryServices.some((x) => x.id === service) ? service : '',
      query: (p.get('ara') ?? '').slice(0, 120),
    },
    shown: Math.min(
      galleryExamples.length,
      Math.max(GALLERY_PAGE_SIZE, Number(p.get('adet')) || GALLERY_PAGE_SIZE),
    ),
    selection: galleryExamples.some((item) => item.id === p.get('ornek'))
      ? { id: p.get('ornek')!, lightOn: true }
      : null,
  };
}

export function ExampleGallery({ service }: { service?: SignExample['service'] }) {
  const [filters, setFilters] = useState<GalleryFilters>(emptyGalleryFilters);
  const [shown, setShown] = useState(GALLERY_PAGE_SIZE);
  const [selection, setSelection] = useState<Selection>(null);
  const [extraFiltersOpen, setExtraFiltersOpen] = useState(false);
  const extraExpanded = extraFiltersOpen;
  const available = galleryExamples.filter((item) => !service || item.serviceIds.includes(service));
  const filtered = available.filter((item) => matchesExample(item, filters));
  const visible = filtered.slice(0, shown);
  const active = Boolean(filters.family || filters.audience || filters.service || filters.query);
  const selected = selection ? galleryExamples.find((item) => item.id === selection.id) : undefined;
  useEffect(() => {
    if (service) return;
    function restore() {
      const state = readLocation();
      setFilters(state.filters);
      setShown(state.shown);
      setSelection(state.selection);
      setExtraFiltersOpen(Boolean(state.filters.audience || state.filters.service));
    }
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [service]);

  function writeLocation(next: GalleryFilters, count: number, id = '', push = false) {
    if (service) return;
    const url = new URL(window.location.href);
    const values: Record<string, string> = {
      kategori: next.family,
      isletme: next.audience,
      hizmet: next.service,
      ara: next.query,
      adet: count > GALLERY_PAGE_SIZE ? String(count) : '',
      ornek: id,
    };
    Object.entries(values).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    });
    const state = { ...window.history.state, galleryDialog: push ? id : null };
    window.history[push ? 'pushState' : 'replaceState'](state, '', url);
  }
  function changeFilters(patch: Partial<GalleryFilters>) {
    const next = { ...filters, ...patch };
    setFilters(next);
    setShown(GALLERY_PAGE_SIZE);
    writeLocation(next, GALLERY_PAGE_SIZE);
  }
  function reset() {
    setFilters(emptyGalleryFilters);
    setShown(GALLERY_PAGE_SIZE);
    writeLocation(emptyGalleryFilters, GALLERY_PAGE_SIZE);
  }
  function open(example: GalleryExample, lightOn: boolean) {
    setSelection({ id: example.id, lightOn });
    writeLocation(filters, shown, example.id, true);
  }
  function close() {
    if (!service && window.history.state?.galleryDialog === selection?.id) window.history.back();
    else {
      setSelection(null);
      writeLocation(filters, shown);
    }
  }
  function countWith(patch: Partial<GalleryFilters>) {
    return available.filter((item) => matchesExample(item, { ...filters, ...patch })).length;
  }
  const serviceOptions = galleryServices.filter(
    (item) =>
      available.some((example) => example.serviceIds.includes(item.id)) &&
      (!filters.family || item.family === filters.family),
  );
  return (
    <>
      {!service && (
        <div className="gallery-controls">
          <div className="gallery-primary-filters" aria-label="Hizmet grupları">
            <button
              type="button"
              aria-pressed={!filters.family}
              onClick={() => changeFilters({ family: '', service: '' })}
            >
              Tümü
            </button>
            {galleryFamilies.map((family) => {
              const count = countWith({ family: family.id, service: '' });
              return (
                <button
                  type="button"
                  key={family.id}
                  aria-label={family.title}
                  aria-pressed={filters.family === family.id}
                  disabled={count === 0 && filters.family !== family.id}
                  onClick={() => changeFilters({ family: family.id, service: '' })}
                >
                  {family.title}
                  <span aria-hidden="true">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="gallery-refinements">
            <label className="gallery-search">
              <span>Marka veya uygulama ara</span>
              <span className="gallery-search-field">
                <Search size={17} aria-hidden="true" />
                <input
                  type="search"
                  value={filters.query}
                  maxLength={120}
                  onChange={(event) => changeFilters({ query: event.target.value })}
                  placeholder="Örn. kutu harf, folyo, Fakir"
                />
              </span>
            </label>
            <button
              type="button"
              className="gallery-extra-toggle"
              aria-controls="gallery-secondary-filters"
              aria-expanded={extraExpanded}
              onClick={() => {
                setExtraFiltersOpen(!extraExpanded);
              }}
            >
              {extraExpanded ? 'Ek filtreleri kapat' : 'İşletme ve uygulama filtreleri'}
              <span aria-hidden="true">{extraExpanded ? '−' : '+'}</span>
            </button>
            <div
              id="gallery-secondary-filters"
              className="gallery-secondary-filters"
              data-expanded={extraExpanded}
            >
              <label>
                İşletme türü
                <select
                  value={filters.audience}
                  onChange={(event) => changeFilters({ audience: event.target.value })}
                >
                  <option value="">Tüm işletmeler</option>
                  {galleryAudiences.map((audience) => {
                    const count = countWith({ audience: audience.id });
                    return (
                      <option
                        key={audience.id}
                        value={audience.id}
                        disabled={count === 0 && filters.audience !== audience.id}
                      >
                        {audience.title} ({count})
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                Uygulama türü
                <select
                  value={filters.service}
                  onChange={(event) => changeFilters({ service: event.target.value })}
                >
                  <option value="">Tüm uygulamalar</option>
                  {serviceOptions.map((item) => {
                    const count = countWith({ service: item.id });
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        disabled={count === 0 && filters.service !== item.id}
                      >
                        {item.title} ({count})
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="gallery-result-bar">
        <p role="status">
          {filtered.length === 0
            ? 'Bu seçimde örnek bulunamadı.'
            : visible.length + ' / ' + filtered.length + ' örnek gösteriliyor'}
        </p>
        {active && (
          <button type="button" onClick={reset}>
            <RotateCcw size={13} aria-hidden="true" />
            Filtreleri temizle
          </button>
        )}
      </div>
      <div className={'examples-grid' + (service ? ' examples-pair' : '')}>
        {visible.map((item, index) => (
          <ExampleCard key={item.id} example={item} onOpen={open} eager={index < 2} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="gallery-empty">
          <p>Başka bir kelime deneyin veya filtreleri temizleyin.</p>
          <button type="button" className="button button-secondary" onClick={reset}>
            Tüm örnekleri göster
          </button>
        </div>
      )}
      {shown < filtered.length && (
        <div className="gallery-more">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              const next = shown + GALLERY_PAGE_SIZE;
              setShown(next);
              writeLocation(filters, next);
            }}
          >
            Daha fazla örnek göster
            <span>+{Math.min(GALLERY_PAGE_SIZE, filtered.length - shown)}</span>
          </button>
        </div>
      )}
      {selected && (
        <ExampleDialog
          key={selected.id}
          example={selected}
          initialLightOn={selection!.lightOn}
          onClose={close}
        />
      )}
    </>
  );
}
