import { Phone } from 'lucide-react';
import { site } from '@/config/site';

const greeting = 'Merhabalar, tabela hizmetleriniz hakkında bilgi almak istiyorum.';

export function FloatingContact() {
  return (
    <nav className="floating-contact" aria-label="Hızlı iletişim">
      <a
        className="floating-call"
        href={site.phoneHref}
        aria-label="Telefonla ara"
        title="Telefonla ara"
      >
        <Phone size={19} aria-hidden="true" />
      </a>
      <a
        className="floating-whatsapp"
        href={`${site.whatsapp}?text=${encodeURIComponent(greeting)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile bilgi al"
        title="WhatsApp ile bilgi al"
      >
        <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.47 0 .1 5.36.1 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.23-1.63a11.95 11.95 0 0 0 5.82 1.49h.01C18.65 23.86 24 18.5 24 11.91c0-3.2-1.24-6.2-3.48-8.43ZM12.06 21.84a9.92 9.92 0 0 1-5.05-1.38l-.36-.21-3.7.97.99-3.61-.24-.38a9.9 9.9 0 0 1-1.52-5.28c0-5.48 4.46-9.94 9.95-9.94a9.87 9.87 0 0 1 7.03 2.91 9.88 9.88 0 0 1 2.91 7.03c0 5.48-4.47 9.89-10.01 9.89Zm5.46-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.48-.5-.68-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </a>
    </nav>
  );
}
