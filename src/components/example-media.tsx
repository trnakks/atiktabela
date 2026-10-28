'use client';

import { useState } from 'react';
import { Maximize2, Power } from 'lucide-react';
import type { GalleryExample } from '@/content/gallery';

export function ExampleMedia({
  example,
  lightOn,
  onLightChange,
  onInspect,
  full = false,
  eager = false,
}: {
  example: GalleryExample;
  lightOn: boolean;
  onLightChange: (value: boolean) => void;
  onInspect?: () => void;
  full?: boolean;
  eager?: boolean;
}) {
  const [offSrc, setOffSrc] = useState<string | undefined>(
    lightOn ? undefined : example.lightOffImage,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const image = example.image!;
  const thumbnail = image.replace(/\.webp$/, '-960.webp');
  const small = image.replace(/\.webp$/, '-480.webp');
  async function toggleLight() {
    if (busy) return;
    if (!lightOn) {
      onLightChange(true);
      return;
    }
    if (offSrc) {
      onLightChange(false);
      return;
    }
    setBusy(true);
    setError('');
    try {
      const pending = new window.Image();
      pending.src = example.lightOffImage!;
      await pending.decode();
      setOffSrc(example.lightOffImage);
      onLightChange(false);
    } catch {
      setError('Görünüm yüklenemedi. Tekrar deneyebilirsiniz.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <div
      className={'example-visual example-media' + (full ? ' example-media-full' : '')}
      data-light={lightOn ? 'on' : 'off'}
    >
      <img
        className="example-image-main"
        src={full ? image : thumbnail}
        srcSet={
          full
            ? undefined
            : small +
              ' 480w, ' +
              image.replace(/\.webp$/, '-768.webp') +
              ' 768w, ' +
              thumbnail +
              ' 960w'
        }
        sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1440px) calc((100vw - 184px) / 2), 628px"
        width={1536}
        height={1024}
        alt={example.title}
        loading={eager || full ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
      {offSrc && (
        <img
          className="example-image-off"
          src={offSrc}
          width={1536}
          height={1024}
          alt=""
          aria-hidden="true"
        />
      )}
      {onInspect && (
        <button
          type="button"
          className="example-zoom"
          aria-label={example.title + ' görselini büyüt'}
          onClick={onInspect}
        >
          <span>
            <Maximize2 size={16} aria-hidden="true" /> Büyüt
          </span>
        </button>
      )}
      {example.lightOffImage && (
        <button
          type="button"
          className="light-toggle"
          aria-label={example.title + (lightOn ? ': Işığı kapat' : ': Işığı aç')}
          aria-pressed={lightOn}
          aria-busy={busy}
          disabled={busy}
          onClick={toggleLight}
        >
          <Power size={14} aria-hidden="true" />
          {busy ? 'Hazırlanıyor…' : lightOn ? 'Işığı kapat' : 'Işığı aç'}
        </button>
      )}
      {error && (
        <p className="example-media-error" role="status">
          {error}
        </p>
      )}
    </div>
  );
}
