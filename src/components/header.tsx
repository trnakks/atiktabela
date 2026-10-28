'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, Menu, Phone, X, MessageCircle } from 'lucide-react';
import { navigation, site } from '@/config/site';
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <a href={site.map} target="_blank" rel="noopener noreferrer">
            <MapPin size={13} />
            Adres ve Yol Tarifi
            <ArrowUpRight size={12} />
          </a>
          <span className="topbar-note">Markanızın sokaktaki imzası.</span>
          <div className="topbar-contact">
            <a href={site.phoneHref}>
              <Phone size={13} />
              <span>{site.phone}</span>
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={15} />
            </a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="wordmark" prefetch={false} title="Ana sayfa">
            ATİK
            <span>
              TABELA<span className="brand-dot">.</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Ana menü">
            {navigation.map((item) => (
              <Link
                prefetch={false}
                key={item.href}
                href={item.href}
                className={
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'active'
                    : ''
                }
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            prefetch={false}
            className="button header-cta"
            href="/teklif-al/"
            onClick={() => setOpen(false)}
          >
            Teklif Al
            <ArrowUpRight size={17} />
          </Link>
          <button
            className="menu-toggle"
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobil menü">
            {navigation.map((item) => (
              <Link
                prefetch={false}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
            <Link prefetch={false} href="/teklif-al/" onClick={() => setOpen(false)}>
              Teklif al
              <ArrowUpRight size={18} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
