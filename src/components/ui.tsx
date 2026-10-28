import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { faqs, process } from '@/content/catalog';
import { site } from '@/config/site';

export function Button({
  href,
  children,
  secondary = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  external?: boolean;
}) {
  const props = {
    className: `button ${secondary ? 'button-secondary' : ''}`,
    children: (
      <>
        {children}
        <ArrowUpRight size={18} aria-hidden />
      </>
    ),
  };
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
  ) : (
    <Link href={href} prefetch={false} {...props} />
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function SectionTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}
export function PageHero({
  label,
  title,
  accent,
  text,
}: {
  label: string;
  title: string;
  accent?: string;
  text: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-row">
          <div>
            <Eyebrow>{label}</Eyebrow>
            <h1>
              {title}
              {accent && (
                <>
                  <br />
                  <em>{accent}</em>
                </>
              )}
            </h1>
          </div>
          <p>{text}</p>
        </div>
      </div>
      <span className="hero-outline" aria-hidden>
        ATİK
      </span>
    </section>
  );
}
export function Process() {
  return (
    <section className="section process-section">
      <div className="container">
        <SectionTitle label="Fikirden uygulamaya" title="İyi bir sonuç, iyi bir süreçle başlar." />
        <div className="process-grid">
          {process.map((item, i) => (
            <div className="process-item" key={item.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function FAQ({ limit, items = faqs }: { limit?: number; items?: typeof faqs } = {}) {
  return (
    <section className="section">
      <div className="container faq-layout">
        <div>
          <Eyebrow>Aklınızdaki sorular</Eyebrow>
          <h2>
            Birlikte
            <br />
            netleştirelim.
          </h2>
          <p className="muted">
            Başka bir sorunuz mu var?
            <br />
            <a className="text-link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp üzerinden sorun <ArrowUpRight size={16} />
            </a>
          </p>
        </div>
        <div>
          {items.slice(0, limit ?? items.length).map((item) => (
            <details className="faq" key={item.question}>
              <summary>
                {item.question}
                <Plus size={18} aria-hidden />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="container cta">
      <div>
        <Eyebrow>Projeniz için ilk adım</Eyebrow>
        <h2>
          Markanızın yeni
          <br />
          <em>imzasını atalım.</em>
        </h2>
      </div>
      <div>
        <p>
          Alan fotoğrafınızı veya tasarımınızı, yaklaşık ölçü ve adet bilgisiyle WhatsApp’tan
          paylaşın. Üretim ve uygulama kapsamını birlikte netleştirelim.
        </p>
        <Button href={site.whatsapp} external>
          Projenizi konuşalım
        </Button>
      </div>
      <span className="cta-star" aria-hidden>
        ✳
      </span>
    </section>
  );
}
