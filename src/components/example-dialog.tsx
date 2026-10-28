'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ArrowUpRight, Copy, X } from 'lucide-react';
import type { GalleryExample } from '@/content/gallery';
import { galleryServices, galleryServiceHref } from '@/content/gallery-services';
import { exampleShareUrl, exampleQuoteUrl } from '@/lib/gallery-links';
import { ExampleMedia } from './example-media';

export default function ExampleDialog({
  example,
  initialLightOn,
  onClose,
}: {
  example: GalleryExample;
  initialLightOn: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [lightOn, setLightOn] = useState(initialLightOn);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    const dialog = ref.current!;
    const trigger = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      dialog.close();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  const related = galleryServices.filter((service) => example.serviceIds.includes(service.id));
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(exampleShareUrl(example.id));
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  }
  return createPortal(
    <dialog
      ref={ref}
      className="example-dialog"
      aria-labelledby={titleId}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const nodes = [
          ...event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input, select',
          ),
        ].filter((node) => node.getClientRects().length > 0);
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="example-dialog-shell">
        <header className="example-dialog-header">
          <span>{example.kind === 'study' ? 'Tasarım çalışması' : 'Uygulama örneği'}</span>
          <button type="button" autoFocus onClick={onClose} aria-label="Görseli kapat">
            <X size={22} />
          </button>
        </header>
        <ExampleMedia example={example} lightOn={lightOn} onLightChange={setLightOn} full />
        <div className="example-dialog-body">
          <div>
            <h2 id={titleId}>{example.title}</h2>
            <p>{example.purpose}</p>
          </div>
          <dl className="example-specs">
            <div>
              <dt>Yüzey</dt>
              <dd>{example.surface}</dd>
            </div>
            <div>
              <dt>Aydınlatma</dt>
              <dd>{example.lighting}</dd>
            </div>
          </dl>
          <div className="example-related-services" aria-label="İlgili hizmetler">
            {related.map((service) => (
              <Link key={service.id} href={galleryServiceHref(service.id)}>
                {service.title}
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="example-production-note">{example.note}</p>
          <div className="example-dialog-actions">
            <a
              className="button"
              href={exampleQuoteUrl(example)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Benzerini yaptırmak istiyorum
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <button type="button" className="example-copy" onClick={copyLink}>
              <Copy size={15} aria-hidden="true" />
              {copied ? 'Bağlantı kopyalandı' : 'Bağlantıyı kopyala'}
            </button>
            <span role="status" className="sr-only">
              {copied ? 'Örneğin bağlantısı panoya kopyalandı.' : ''}
            </span>
          </div>
          {copyError && (
            <label className="example-copy-fallback">
              Bu bağlantıyı kopyalayabilirsiniz
              <input
                readOnly
                value={exampleShareUrl(example.id)}
                onFocus={(event) => event.target.select()}
              />
            </label>
          )}
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
