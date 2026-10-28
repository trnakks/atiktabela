'use client';
import { useState } from 'react';
import { Power } from 'lucide-react';
const sizes = '(max-width: 640px) calc(100vw - 40px), 50vw';
const sources = (name: string) =>
  `/images/${name}-480.webp 480w, /images/${name}-768.webp 768w, /images/${name}-960.webp 960w, /images/${name}.webp 1536w`;
export function FacadeVisual({ priority = false }: { priority?: boolean }) {
  const [lightOn, setLightOn] = useState(false);
  const [litReady, setLitReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function toggle() {
    if (busy) return;
    if (lightOn || litReady) {
      setLightOn(!lightOn);
      return;
    }
    setBusy(true);
    setError('');
    try {
      const image = new window.Image();
      image.srcset = sources('atik-cephe-konsepti');
      image.sizes = sizes;
      image.src = '/images/atik-cephe-konsepti.webp';
      await image.decode();
      setLitReady(true);
      setLightOn(true);
    } catch {
      setError('Görsel yüklenemedi. Tekrar deneyebilirsiniz.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <figure className="facade-visual">
      <div className="facade-image" data-light={lightOn ? 'on' : 'off'}>
        <img
          className="facade-image-off"
          src="/images/atik-cephe-isik-kapali.webp"
          srcSet={sources('atik-cephe-isik-kapali')}
          sizes={sizes}
          alt="Antrasit cephede ATİK TABELA kutu harfleri"
          aria-hidden={lightOn}
          width={1536}
          height={1024}
          fetchPriority={priority ? 'high' : 'auto'}
          loading="eager"
        />
        {litReady && (
          <img
            className="facade-image-on"
            src="/images/atik-cephe-konsepti.webp"
            srcSet={sources('atik-cephe-konsepti')}
            sizes={sizes}
            alt="Amber ışıkla aydınlatılmış ATİK TABELA kutu harfleri"
            aria-hidden={!lightOn}
            width={1536}
            height={1024}
          />
        )}
        <button
          type="button"
          className="light-toggle"
          aria-label={`ATİK TABELA: ${busy ? 'Hazırlanıyor…' : lightOn ? 'Işığı kapat' : 'Işığı aç'}`}
          aria-pressed={lightOn}
          aria-busy={busy}
          disabled={busy}
          onClick={toggle}
        >
          <Power size={14} aria-hidden />
          {busy ? 'Hazırlanıyor…' : lightOn ? 'Işığı kapat' : 'Işığı aç'}
        </button>
        <span className="concept-badge">Örnek tasarım</span>
      </div>
      {error && (
        <p className="quote-hint" role="status">
          {error}
        </p>
      )}
      <figcaption>
        <span>Kutu harf / antrasit cephe</span>
        <span>Amber ışık · üç boyutlu harf</span>
      </figcaption>
    </figure>
  );
}
