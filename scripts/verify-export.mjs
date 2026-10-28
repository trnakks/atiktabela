import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('out');
const origin = 'https://atiktabela.com';
const routes = [
  '/',
  '/hakkimizda/',
  '/hizmetler/',
  '/referans/',
  '/surecimiz/',
  '/iletisim/',
  '/teklif-al/',
  '/gizlilik/',
];
const titles = new Set();
const descriptions = new Set();
function attr(html, tag, name, value, result) {
  const elements = html.match(new RegExp(`<${tag}\\b[^>]*>`, 'gi')) || [];
  return elements
    .find((element) => element.includes(`${name}="${value}"`))
    ?.match(new RegExp(`${result}="([^"]*)"`))?.[1];
}
function localFile(url) {
  const pathname = decodeURIComponent(url.pathname);
  const target = path.resolve(root, '.' + pathname);
  assert(target.startsWith(root + path.sep) || target === root, 'Asset escaped export root');
  if (fs.existsSync(target) && fs.statSync(target).isDirectory())
    return path.join(target, 'index.html');
  return target;
}
let imageCount = 0;
for (const route of routes) {
  const html = fs.readFileSync(localFile(new URL(route, origin)), 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = attr(html, 'meta', 'name', 'description', 'content');
  assert(title && !titles.has(title), `Missing or duplicate title: ${route}`);
  assert(
    description?.length >= 50 && !descriptions.has(description),
    `Missing or duplicate description: ${route}`,
  );
  titles.add(title);
  descriptions.add(description);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Expected one H1: ${route}`);
  assert(html.includes('lang="tr"'), `Missing Turkish language: ${route}`);
  assert.equal(
    attr(html, 'link', 'rel', 'canonical', 'href'),
    origin + route,
    `Canonical mismatch: ${route}`,
  );
  const robots = attr(html, 'meta', 'name', 'robots', 'content') || '';
  assert.equal(
    robots.includes('noindex'),
    process.env.SITE_INDEXABLE === 'false',
    `Unexpected indexing setting: ${route}`,
  );
  assert.equal(
    attr(html, 'meta', 'property', 'og:url', 'content'),
    origin + route,
    `Open Graph URL mismatch: ${route}`,
  );
  const structured = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ].map((match) => JSON.parse(match[1]));
  const business = structured
    .flatMap((data) => data['@graph'] || [data])
    .find((data) => data['@type'] === 'LocalBusiness');
  assert(
    business?.address?.streetAddress && business.geo && business.telephone,
    `Incomplete business schema: ${route}`,
  );
  assert.equal(business.hasOfferCatalog.itemListElement.length, 23, 'Service schema incomplete');
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/\balt="/.test(match[0]), `Image without alt: ${route}`);
    assert(
      /\bwidth="/.test(match[0]) && /\bheight="/.test(match[0]),
      `Image without dimensions: ${route}`,
    );
  }
  for (const match of html.matchAll(/<(?:a|img|script|link)\b[^>]*\b(?:href|src)="([^"#]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/')) continue;
    const url = new URL(href, origin);
    const file = localFile(url);
    assert(fs.existsSync(file), `Missing local target ${href} on ${route}`);
    if (url.hash && file.endsWith('.html'))
      assert(
        fs.readFileSync(file, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `Missing anchor: ${href}`,
      );
  }
}
const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length, 'Unexpected sitemap pages');
imageCount = (sitemap.match(/<image:loc>/g) || []).length;
assert.equal(imageCount, 42, 'Reference image sitemap incomplete');
for (const match of sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g))
  assert(fs.existsSync(localFile(new URL(match[1]))), 'Missing sitemap image');
assert(
  !sitemap.includes('/tasarim-ornekleri/') && !sitemap.includes('/hizmetler/totem-tabela/'),
  'Legacy URL in sitemap',
);
assert(
  fs.readFileSync('out/robots.txt', 'utf8').includes(origin + '/sitemap.xml'),
  'Missing sitemap declaration',
);
assert(fs.existsSync('out/404.html'), 'Missing 404 page');
const rules = JSON.parse(fs.readFileSync('amplify-redirects.json', 'utf8'));
assert(
  !rules.some((rule) => rule.source === '/<*>' && rule.status === '200'),
  'Do not apply an SPA rewrite to this multipage site',
);
assert(
  rules.some((rule) => rule.source === '/<*>' && rule.status === '404'),
  'Missing 404 hosting rule',
);
for (const rule of rules.filter((rule) => rule.status === '301' && rule.source.startsWith('/')))
  assert(
    fs.existsSync(localFile(new URL(rule.target, origin))),
    `Redirect target missing: ${rule.target}`,
  );
console.log(
  `Launch export verified: ${routes.length} pages, ${imageCount} sitemap images, business schema, internal targets and hosting rules.`,
);
