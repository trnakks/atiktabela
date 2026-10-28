import { test, expect } from '@playwright/test';
test('Legacy pages lead to current services and references', async ({ page }) => {
  for (const slug of [
    'kutu-harf',
    'isikli-tabela',
    'cephe-giydirme',
    'totem-tabela',
    'neon-tabela',
    'yonlendirme',
  ]) {
    await page.goto(`/hizmetler/${slug}/`);
    await expect(page).toHaveURL(new RegExp(`/hizmetler/#${slug}$`));
    await expect(page.locator(`#${slug} dt`)).toBeVisible();
  }
  await page.goto('/tasarim-ornekleri/?hizmet=kase&ornek=atik-kase');
  await expect(page).toHaveURL(/\/referans\/\?hizmet=kase&ornek=atik-kase/);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.goto('/tabela-modelleri/');
  await expect(page).toHaveURL(/\/hizmetler\/$/);
  await page.goto('/referans/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://atiktabela.com/referans/',
  );
  await expect(
    page.locator('a[href^="/hizmetler/"]:not([href*="#"]):not([href="/hizmetler/"])'),
  ).toHaveCount(0);
});
