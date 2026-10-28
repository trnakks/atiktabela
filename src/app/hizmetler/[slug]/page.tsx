import { notFound } from 'next/navigation';
import { services } from '@/content/catalog';
import { LegacyRedirect } from '@/components/legacy-redirect';
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: 'Hizmetler',
    robots: { index: false, follow: true },
    alternates: { canonical: '/hizmetler/#' + slug },
  };
}
export default async function LegacyService({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!services.some((service) => service.slug === slug)) notFound();
  return <LegacyRedirect href={'/hizmetler/#' + slug} />;
}
