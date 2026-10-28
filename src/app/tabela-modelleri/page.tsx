import { LegacyRedirect } from '@/components/legacy-redirect';
export const metadata = {
  title: 'Hizmetler',
  robots: { index: false, follow: true },
  alternates: { canonical: '/hizmetler/' },
};
export default function LegacyModels() {
  return <LegacyRedirect href="/hizmetler/" />;
}
