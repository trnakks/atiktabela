'use client';
import { useEffect } from 'react';
export function LegacyRedirect({ href }: { href: string }) {
  useEffect(() => {
    const target = new URL(href, window.location.origin);
    target.search = window.location.search;
    if (!target.hash) target.hash = window.location.hash;
    window.location.replace(target.toString());
  }, [href]);
  return (
    <div className="section container">
      <p>Güncel sayfaya yönlendiriliyorsunuz.</p>
      <a className="button" href={href}>
        Güncel sayfayı aç
      </a>
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${href}`} />
      </noscript>
    </div>
  );
}
