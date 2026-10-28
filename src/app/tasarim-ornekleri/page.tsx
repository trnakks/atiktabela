import { LegacyRedirect } from '@/components/legacy-redirect';
export const metadata = {
  title: 'Referanslarımız',
  robots: { index: false, follow: true },
  alternates: { canonical: '/referans/' },
};
export default function LegacyGallery() {
  return <LegacyRedirect href="/referans/" />;
}
