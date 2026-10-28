import { site } from '../src/config/site';
import { test, expect, type Page } from '@playwright/test';
import { services } from '../src/content/catalog';
import { galleryExamples } from '../src/content/gallery';
import { galleryServices, galleryServiceHref } from '../src/content/gallery-services';
import { serviceDirectory } from '../src/content/service-directory';
async function selectGalleryOption(page: Page, label: string, value: string) {
  const toggle = page.locator('.gallery-extra-toggle');
  if ((await toggle.isVisible()) && (await toggle.getAttribute('aria-expanded')) === 'false')
    await toggle.click();
  await page.getByLabel(label).selectOption(value);
}

test.beforeEach(async ({ page }) => {
  await page.route('https://maps.google.com/**', (route) => route.abort());
  await page.route('https://www.google.com/maps**', (route) => route.abort());
});

test('Tüm sayfalar açılır; taşma ve tarayıcı hatası oluşmaz', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const paths = [
    '/',
    '/iletisim/',
    '/teklif-al/',
    '/hakkimizda/',
    '/hizmetler/',
    '/referans/',
    '/surecimiz/',
    '/gizlilik/',
  ];
  const descriptions = new Set<string>();
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('h1'), path).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
    const canonical = new URL(path, site.url).toString();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(50);
    expect(descriptions.has(description!)).toBeFalsy();
    descriptions.add(description!);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      description!,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      `${site.url}/opengraph-image.png`,
    );
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      'content',
      '1200',
    );
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
      'content',
      '630',
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      description!,
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      'content',
      `${site.url}/opengraph-image.png`,
    );

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      path,
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test('Home connects all service families and shows a consistent curated selection', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.home-service-group')).toHaveCount(serviceDirectory.length);
  await expect(page.locator('.home-examples .section-footer')).toContainText(
    `${galleryExamples.length} referansı`,
  );
  await expect(page.locator('.home-examples .example-card')).toHaveCount(3);
  for (const id of ['sahane-altin-harf', 'burgerslak-vitrin', 'ref-century21'])
    await expect(page.locator('.home-examples .example-' + id)).toBeVisible();
  const examplesPosition = await page
    .locator('.home-examples')
    .evaluate((x) => x.getBoundingClientRect().top + scrollY);
  const approachPosition = await page
    .locator('.home-approach')
    .evaluate((x) => x.getBoundingClientRect().top + scrollY);
  expect(examplesPosition).toBeLessThan(approachPosition);
  for (const group of serviceDirectory) {
    await expect(
      page.locator(`.home-service-group[href="/hizmetler/#grup-${group.id}"]`),
    ).toHaveCount(1);
  }
  await page.locator('.home-service-group').filter({ hasText: 'Matbaa & kaşe' }).click();
  await expect(page).toHaveURL(/hizmetler\/#grup-matbaa/);
  await expect(page.locator('#grup-matbaa')).toBeInViewport();
  await page.locator('#grup-matbaa summary').click();
  await expect(page.locator('#kartvizit dt')).toBeVisible();
});

test('Form doğru numaraya ve Türkçe içerikle WhatsApp mesajı hazırlar', async ({ page }) => {
  await page.goto('/iletisim/');
  await page.getByLabel('Adınız soyadınız').fill('Ayşe Çelik');
  await page.getByLabel('Telefon numaranız').fill('05421234567');
  await page.getByLabel('E-posta adresiniz').fill('ayse@example.com');
  await expect(page.locator('select[name="service"] option')).toHaveCount(24);
  await expect(page.locator('select[name="service"] optgroup')).toHaveCount(5);
  await page.getByLabel('İlgilendiğiniz çözüm').selectOption('kutu-harf');
  await page
    .getByLabel('Biraz detay paylaşır mısınız?')
    .fill('İşletmem için ışıklı kutu harf tabela istiyorum.');
  await page.getByRole('button', { name: 'WhatsApp mesajı hazırla' }).click();
  const href = await page.getByRole('link', { name: 'WhatsApp’ta aç' }).getAttribute('href');
  expect(href).toContain('https://wa.me/905427743735?text=');
  expect(decodeURIComponent(href!)).toContain('Ayşe Çelik');
  expect(decodeURIComponent(href!)).toContain('Kutu harf');
  expect(decodeURIComponent(href!)).toContain('ayse@example.com');
  await page.getByLabel('Adınız soyadınız').fill('Ayşe Yılmaz');
  await expect(page.getByRole('link', { name: 'WhatsApp’ta aç' })).toHaveCount(0);
});

test('Gallery search opens accessible detail and carries the selected example into WhatsApp', async ({
  page,
}) => {
  await page.goto('/referans/');
  await expect(page.locator('.example-card')).toHaveCount(12);
  await expect(page.locator('.scene-sign')).toHaveCount(0);
  const first = page.locator('.example-visual').first();
  expect((await first.boundingBox())!.y).toBeLessThan(page.viewportSize()!.height);
  await expect(page.locator('.floating-contact')).toBeHidden();
  await page.getByLabel('Marka veya uygulama ara').fill('Fakir');
  await expect(page.locator('.example-card')).toHaveCount(1);
  const trigger = page.locator('.example-ref-arslan .example-zoom');
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading')).toHaveText('Arslan Servis · Çok markalı tabela');
  await expect(dialog.locator('.light-toggle')).toHaveCount(0);
  await expect(dialog.getByRole('link', { name: 'Işıksız tabela' })).toHaveAttribute(
    'href',
    '/hizmetler/#isiksiz-tabela',
  );
  const url = new URL(
    (await dialog
      .getByRole('link', { name: 'Benzerini yaptırmak istiyorum' })
      .getAttribute('href'))!,
  );
  expect(url.pathname).toBe('/905427743735');
  expect(url.searchParams.get('text')).toContain('ref-arslan');
  expect(url.searchParams.get('text')).toContain('?ornek=ref-arslan');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.getByLabel('Marka veya uygulama ara')).toHaveValue('Fakir');
});

test('Gezinme, mobil menü ve ekran görüntüleri', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Menüyü aç' }).click();
    await page.locator('#mobile-nav').getByRole('link', { name: 'İletişim', exact: true }).click();
    await expect(page).toHaveURL(/iletisim/);
    await expect(page.locator('#mobile-nav')).toHaveCount(0);
    await page.goto('/');
  }
  await page.screenshot({ path: `artifacts/home-${testInfo.project.name}.png`, fullPage: true });
  await page.goto('/iletisim/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('iframe')).toHaveAttribute('src', site.mapEmbed);
  await expect(
    page.locator('footer').getByRole('link', { name: 'WhatsApp', exact: true }),
  ).toHaveAttribute('href', 'https://wa.me/905427743735');
  await page.screenshot({ path: `artifacts/contact-${testInfo.project.name}.png`, fullPage: true });
});

test('Card and dialog lighting remain independent, stable and keyboard accessible', async ({
  page,
}) => {
  await page.goto('/referans/');
  const first = page.locator('.example-sahane-altin-harf');
  const second = page.locator('.example-ref-yurtici');
  const toggle = first.locator('.light-toggle');
  await expect(first.locator('.example-image-off')).toHaveCount(0);
  await first.scrollIntoViewIfNeeded();
  const before = await first.locator('.example-visual').boundingBox();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(first.locator('.example-image-off')).toHaveCSS('opacity', '1');
  expect(await first.locator('.example-visual').boundingBox()).toEqual(before);
  await expect(second.locator('.light-toggle')).toHaveAttribute('aria-pressed', 'true');
  await first.locator('.example-zoom').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('.light-toggle')).toHaveAttribute('aria-pressed', 'false');
  await dialog.locator('.light-toggle').focus();
  await page.keyboard.press('Space');
  await expect(dialog.locator('.light-toggle')).toHaveAttribute('aria-pressed', 'true');
  await expect(first.locator('.light-toggle')).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Görseli kapat' }).click();
  await expect(dialog).toHaveCount(0);
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});

test('Home facade lighting switches between loaded images without layout movement', async ({
  page,
}) => {
  await page.goto('/');
  const visual = page.locator('.facade-image');
  const toggle = visual.getByRole('button');
  const offImage = visual.locator('.facade-image-off');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(offImage).toHaveCSS('opacity', '1');
  await offImage.evaluate((node) => (node as HTMLImageElement).decode());
  await page.evaluate(() => document.fonts.ready);
  const measure = () =>
    visual.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      };
    });
  const before = await measure();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(offImage).toHaveCSS('opacity', '0');
  await expect(offImage).toHaveAttribute('src', '/images/atik-cephe-isik-kapali.webp');
  expect(await measure()).toEqual(before);
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(offImage).toHaveCSS('opacity', '1');
});

test('Services explain the offering and connect to the visual gallery', async ({ page }) => {
  await page.goto('/hizmetler/');
  await expect(page.locator('.service-directory-group')).toHaveCount(5);
  await expect(page.getByRole('status')).toHaveText('23 hizmet · 5 grup');
  const previews = serviceDirectory.flatMap((group) =>
    group.items.map((item) => item.preview?.image),
  );
  expect(previews.every(Boolean)).toBeTruthy();
  expect(new Set(previews).size).toBe(previews.length);
  const allVisuals = [...previews, ...serviceDirectory.map((group) => group.image)].map((image) =>
    image!.replace(/-(480|960)\.webp$/, '.webp'),
  );
  expect(new Set(allVisuals).size).toBe(allVisuals.length);
  for (const group of serviceDirectory) {
    const section = page.locator('.service-directory-group').filter({ hasText: group.headline });
    await section.locator('figure > img').scrollIntoViewIfNeeded();
    await section.locator('figure > img').evaluate((image) => (image as HTMLImageElement).decode());
    await section.locator('summary').click();
    for (const item of group.items) {
      const row = section.locator('#' + item.id);
      await expect(row.locator('dt')).toHaveText(item.title);
      await expect(row.locator('dt')).toBeVisible();
      await row.locator('.service-item-preview img').scrollIntoViewIfNeeded();
      await row
        .locator('.service-item-preview img')
        .evaluate((image) => (image as HTMLImageElement).decode());
      expect(
        galleryExamples.find((example) => example.id === item.preview?.id)?.serviceIds,
      ).toContain(item.id);
      await expect(row.getByRole('link', { name: 'Örnekleri gör' })).toHaveAttribute(
        'href',
        `/referans/?hizmet=${item.id}`,
      );
      const href = await row.getByRole('link', { name: 'Teklif al' }).getAttribute('href');
      expect(new URL(href!).searchParams.get('text')).toContain(item.title);
    }
    await section.locator('summary').click();
  }
  await expect(page.locator('.faq')).toHaveCount(5);
  await expect(page.locator('.floating-contact')).toBeHidden();
  await page.getByRole('button', { name: 'Matbaa & kaşe', exact: true }).click();
  await expect(page.locator('.service-directory-group')).toHaveCount(1);
  await page.getByLabel('Hizmet ara').fill('kartvizit');
  await expect(page.locator('.service-directory-item')).toHaveCount(1);
  await expect(page.locator('#kartvizit dt')).toBeVisible();
  await page.getByLabel('Hizmet ara').fill('bulunamayacak');
  await expect(page.locator('.services-empty')).toBeVisible();
  await page.getByRole('button', { name: 'Tüm hizmetleri göster', exact: true }).click();
  await page.getByLabel('Hizmet ara').fill('isikli');
  await expect(page.locator('#isikli-tabela dt')).toBeVisible();
  await page.goto('/hizmetler/#lazer-kesim');
  await expect(page.locator('#lazer-kesim dt')).toBeVisible();
  await page.locator('#lazer-kesim').getByRole('link', { name: 'Örnekleri gör' }).click();
  await expect(page.getByLabel('Uygulama türü')).toHaveValue('lazer-kesim');
  await expect(page.locator('.example-card')).not.toHaveCount(0);
});

test('Every curated image loads, all light pairs work, and service coverage stays complete', async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto('/referans/');
  while (await page.getByRole('button', { name: /^Daha fazla örnek göster/ }).count()) {
    await page.getByRole('button', { name: /^Daha fazla örnek göster/ }).click();
  }
  await expect(page.locator('.example-card')).toHaveCount(galleryExamples.length);
  for (const example of galleryExamples) {
    const card = page.locator('.example-' + example.id);
    await card.scrollIntoViewIfNeeded();
    await card
      .locator('.example-image-main')
      .evaluate((image) => (image as HTMLImageElement).decode());
    if (!example.lightOffImage) {
      await expect(card.locator('.light-toggle')).toHaveCount(0);
      continue;
    }
    const before = await card.locator('.example-visual').boundingBox();
    await card.locator('.light-toggle').click();
    await expect(card.locator('.light-toggle')).toHaveAttribute('aria-pressed', 'false');
    await expect(card.locator('.example-image-off')).toHaveCSS('opacity', '1');
    expect(await card.locator('.example-visual').boundingBox()).toEqual(before);
  }
  const checkedPages = new Set<string>();
  await page.goto('/hizmetler/');
  for (const service of galleryServices) {
    expect(
      galleryExamples.some((item) => item.serviceIds.includes(service.id)),
      service.id,
    ).toBeTruthy();
    const href = galleryServiceHref(service.id);
    const target = href.split('#')[0];
    if (!checkedPages.has(target)) {
      const response = await page.request.get(target);
      expect(response.status(), href).toBe(200);
      checkedPages.add(target);
    }
    if (href.includes('#')) {
      await expect(page.locator('[id="' + service.id + '"]')).toHaveCount(1);
    }
  }
});

test('Quote builder previews services and generates a live encoded WhatsApp message', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('.header-cta').click();
  await expect(page).toHaveURL(/teklif-al/);
  await expect(page.locator('.quote-message-text')).toContainText('birlikte');
  await expect(page.locator('.quote-message-text')).not.toContainText('false');
  await expect(page.locator('.quote-message a')).toHaveCount(0);
  await page.getByRole('button', { name: 'WhatsApp’ta mesajı aç' }).click();
  await expect(page.locator('#quote-name')).toBeFocused();
  await page.getByLabel('Hizmet seçimi').selectOption('isikli-tabela');
  const light = page.locator('.quote-service-preview .light-toggle');
  await expect(light).toHaveAttribute('aria-pressed', 'true');
  await light.click();
  await expect(light).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#quote-name').fill('Ayşe Çelik');
  await page.locator('[name="business"]').fill('Ada & Kafe');
  await page.locator('[name="location"]').fill('İstanbul, mağaza cephesi');
  await page.locator('[name="dimensions"]').fill('300 × 80 cm');
  await page.locator('[name="note"]').fill('Mevcut tabelamı yenilemek istiyorum.');
  const link = page.locator('.quote-message a');
  const href = await link.getAttribute('href');
  const url = new URL(href!);
  expect(url.pathname).toBe('/905427743735');
  const message = url.searchParams.get('text');
  expect(message).not.toContain('false');
  expect(message).toContain('Merhabalar, ben Ayşe Çelik.');
  expect(message).toContain('ışıklı tabela');
  expect(message).toContain('Ada & Kafe');
  expect(message).toContain('300 × 80 cm');
  await expect(page.locator('.quote-message-text')).toHaveText(message!);
  await page.getByLabel('Hizmet seçimi').selectOption('cephe-giydirme');
  await expect(page.locator('.quote-message-text')).toContainText('dış cephe kaplama');
  await expect(page.locator('#quote-service option')).toHaveCount(24);
  await expect(page.locator('#quote-service optgroup')).toHaveCount(5);
  for (const service of galleryServices) {
    await page.getByLabel('Hizmet seçimi').selectOption(service.id);
    await expect(page.locator('.quote-message-text')).not.toContainText('false');
    await expect(page.locator('.quote-service-caption strong')).toHaveText(service.title);
    await page
      .locator('.quote-service-preview img')
      .first()
      .evaluate((image) => (image as HTMLImageElement).decode());
    expect(new URL((await link.getAttribute('href'))!).searchParams.get('text')).toContain(
      service.title.toLocaleLowerCase('tr-TR'),
    );
  }
  await page.getByLabel('Hizmet seçimi').selectOption('lazer-kesim');
  await page.locator('[name="quantity"]').fill('20');
  await page.locator('[name="material"]').fill('Pleksi');
  await page.locator('[name="thickness"]').fill('3 mm');
  await expect(page.locator('.quote-message-text')).toContainText('Malzeme: Pleksi');
  await expect(page.locator('.quote-message-text')).toContainText('Kalınlık: 3 mm');
  await page.getByLabel('Hizmet seçimi').selectOption('kartvizit');
  await expect(page.locator('[name="material"]')).toHaveCount(0);
  await expect(page.locator('.quote-message-text')).not.toContainText('Pleksi');
  await expect(page.locator('.quote-message-text')).toContainText('Adet: 20');
  await page.getByLabel('Hizmet seçimi').selectOption('');
  await expect(page.locator('.quote-empty')).toBeVisible();
  await page.locator('#quote-name').fill('   ');
  await expect(link).toHaveCount(0);
});

test('Floating contact uses the configured phone and a prepared WhatsApp greeting', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const contact = page.locator('.floating-contact');
  const call = contact.locator('.floating-call');
  const whatsapp = contact.locator('.floating-whatsapp');
  await expect(call).toHaveAttribute('href', 'tel:+905427743735');
  const url = new URL((await whatsapp.getAttribute('href'))!);
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe('/905427743735');
  expect(url.searchParams.get('text')).toBe(
    'Merhabalar, tabela hizmetleriniz hakkında bilgi almak istiyorum.',
  );
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  const before = await contact.boundingBox();
  await page.evaluate(() => window.scrollBy(0, 500));
  expect(await contact.boundingBox()).toEqual(before);
  await page.goto('/teklif-al/');
  await expect(contact).toBeVisible();
  if (testInfo.project.name === 'mobile') {
    await page.locator('#quote-name').focus();
    await expect(contact).toBeHidden();
    await page.locator('h1').click();
    await expect(contact).toBeVisible();
  }
});

test('Service filters, industry and search share correct classifications and URL state', async ({
  page,
}) => {
  await page.goto('/referans/');
  await page.getByRole('button', { name: 'Cephe kaplama', exact: true }).click();
  await expect(page.locator('.example-fsh-kompozit')).toBeVisible();
  await selectGalleryOption(page, 'Uygulama türü', 'kompozit');
  await expect(page.locator('.example-fsh-kompozit')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Uygulama türü')).toHaveValue('kompozit');
  await page.getByRole('button', { name: 'Filtreleri temizle' }).click();
  await selectGalleryOption(page, 'İşletme türü', 'guzellik');
  await expect(page.locator('.example-nail-art-neon')).toBeVisible();
  await expect(page.locator('.example-ref-hairbeauty')).toBeVisible();
  await expect(page.locator('.example-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'Filtreleri temizle' }).click();
  await selectGalleryOption(page, 'Uygulama türü', 'isikli-tabela');
  await expect(page.locator('.example-ref-axa')).toHaveCount(0);
  await expect(page.locator('.example-ref-arslan')).toHaveCount(0);
  await page.getByRole('button', { name: 'Filtreleri temizle' }).click();
  for (const query of ['Braun', 'DeLonghi', 'kasibeyaz', 'yurtici']) {
    await page.getByLabel('Marka veya uygulama ara').fill(query);
    await expect(page.locator('.example-card')).toHaveCount(1);
  }
  await page.getByLabel('Marka veya uygulama ara').fill('bulunmayan-ornek-xyz');
  await expect(page.locator('.gallery-empty')).toBeVisible();
  await page.getByRole('button', { name: 'Tüm örnekleri göster' }).click();
  await expect(page.getByLabel('Marka veya uygulama ara')).toHaveValue('');
  await expect(page.locator('.example-card')).toHaveCount(12);
});

test('Load more preserves location and browser back closes the selected example', async ({
  page,
}) => {
  await page.goto('/referans/');
  await page.getByRole('button', { name: /^Daha fazla örnek göster/ }).click();
  await expect(page.locator('.example-card')).toHaveCount(24);
  await page.reload();
  await expect(page.locator('.example-card')).toHaveCount(24);
  const trigger = page.locator('.example-card').nth(18).locator('.example-zoom');
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page).toHaveURL(/ornek=/);
  await page.goBack();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator('.example-card')).toHaveCount(24);
  await page.goto('/referans/?ornek=atik-kase');
  await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Atik · Kurumsal kaşe');
  await expect(page.getByRole('dialog')).toContainText('Tasarım çalışması');
  await page.getByRole('button', { name: 'Görseli kapat' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('Gallery dialog traps focus and does not permit page scrolling behind it', async ({
  page,
}) => {
  await page.goto('/referans/');
  await page.locator('.example-zoom').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Görseli kapat' })).toBeFocused();
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBeTruthy();
  }
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  expect(await dialog.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBeTruthy();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});
