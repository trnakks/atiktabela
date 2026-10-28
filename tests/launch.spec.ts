import { test, expect } from '@playwright/test';
import { site } from '../src/config/site';
test('Launch metadata, business information and image sitemap are complete', async ({
  page,
  request,
}) => {
  await page.goto('/iletisim/');
  await expect(page.locator('main address')).toContainText(site.address.streetAddress);
  const schema = await page.locator('script[type="application/ld+json"]').textContent();
  const business = JSON.parse(schema!)['@graph'].find(
    (item: { '@type': string }) => item['@type'] === 'LocalBusiness',
  );
  expect(business.telephone).toBe(site.phone);
  expect(business.address.postalCode).toBe(site.address.postalCode);
  expect(business.hasOfferCatalog.itemListElement).toHaveLength(23);
  expect(business.openingHoursSpecification).toBeUndefined();
  const sitemap = await request.get('/sitemap.xml');
  expect((await sitemap.text()).match(/<image:loc>/g)).toHaveLength(42);
  await page.goto('/referans/');
  await page.locator('.reference-archive summary').click();
  await expect(page.locator('.reference-archive a')).toHaveCount(42);
  await page.locator('.reference-archive a[href="/referans/?ornek=service-sticker"]').click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
test('Hosting serves permanent redirects, real 404s and security headers', async ({ request }) => {
  for (const source of ['/hizmetler/totem-tabela/', '/hizmetler/totem-tabela']) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe('/hizmetler/#totem-tabela');
  }
  const gallery = await request.get('/tasarim-ornekleri/?hizmet=kase', { maxRedirects: 0 });
  expect(gallery.status()).toBe(301);
  expect(gallery.headers().location).toBe('/referans/?hizmet=kase');
  expect((await request.get('/page-not-found-launch-check/')).status()).toBe(404);
  const segment = await request.get('/hizmetler/__next.hizmetler.__PAGE__.txt');
  expect(segment.status()).toBe(200);
  expect(await segment.text()).not.toContain('<!DOCTYPE html>');
  const homepage = await request.get('/');
  expect(homepage.headers()['x-content-type-options']).toBe('nosniff');
  expect(homepage.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
});
