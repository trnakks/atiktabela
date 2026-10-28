import { site } from '@/config/site';
import { galleryServices } from '@/content/gallery-services';
export function BusinessSchema() {
  const businessId = site.url + '/#business';
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': businessId,
        name: site.name,
        alternateName: 'Atik Reklam Tabela',
        url: site.url + '/',
        description: site.description,
        image: site.url + '/opengraph-image.png',
        telephone: site.phone,
        foundingDate: '1985',
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.streetAddress,
          addressLocality: site.address.district,
          addressRegion: site.address.city,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        geo: { '@type': 'GeoCoordinates', ...site.geo },
        hasMap: site.map,
        areaServed: { '@type': 'AdministrativeArea', name: 'İstanbul' },
        contactPoint: [site.phone, site.secondaryPhone].map((telephone) => ({
          '@type': 'ContactPoint',
          telephone,
          contactType: 'customer service',
          availableLanguage: 'Turkish',
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Tabela, reklam ve baskı hizmetleri',
          itemListElement: galleryServices.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              serviceType: service.title,
              url: site.url + '/hizmetler/#' + service.id,
              provider: { '@id': businessId },
              areaServed: 'İstanbul',
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': site.url + '/#website',
        url: site.url + '/',
        name: site.name,
        inLanguage: 'tr-TR',
        publisher: { '@id': businessId },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
