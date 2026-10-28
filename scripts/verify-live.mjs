import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = new URL(process.argv[2] || 'https://atiktabela.com');
assert(['https:', 'http:'].includes(base.protocol), 'Supply an HTTP(S) site URL');
let failures = 0;
async function check(label, fn) {
  try {
    await fn();
    console.log('PASS', label);
  } catch (error) {
    failures++;
    console.error('FAIL', label, '—', error.message);
  }
}
for (const route of [
  '/',
  '/hizmetler/',
  '/referans/',
  '/hakkimizda/',
  '/iletisim/',
  '/teklif-al/',
  '/surecimiz/',
  '/gizlilik/',
  '/robots.txt',
  '/sitemap.xml',
]) {
  await check(route, async () => {
    const response = await fetch(new URL(route, base), {
      redirect: 'manual',
      signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 200);
    if (route.endsWith('/')) {
      const html = await response.text();
      assert(html.includes('https://atiktabela.com' + route), 'Production canonical missing');
      assert(!/<meta name="robots" content="[^"]*noindex/.test(html), 'Production page is noindex');
    }
  });
}
for (const rule of JSON.parse(fs.readFileSync('amplify-redirects.json', 'utf8')).filter(
  (rule) => rule.status === '301' && rule.source.startsWith('/'),
)) {
  await check('301 ' + rule.source, async () => {
    const response = await fetch(new URL(rule.source, base), {
      redirect: 'manual',
      signal: AbortSignal.timeout(20000),
    });
    assert(
      [301, 308].includes(response.status),
      `Expected permanent HTTP redirect, got ${response.status}`,
    );
    const target = new URL(response.headers.get('location'), base);
    const expected = new URL(rule.target, base);
    assert.equal(target.pathname + target.hash, expected.pathname + expected.hash);
  });
}
await check('Real 404', async () => {
  const response = await fetch(new URL('/launch-check-page-that-does-not-exist/', base), {
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
  });
  assert.equal(response.status, 404);
});
await check('Security headers', async () => {
  const response = await fetch(base, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert(response.headers.get('content-security-policy'));
});
if (failures) process.exitCode = 1;
else console.log('Live HTTP checks passed. Verify TLS, www routing and Search Console separately.');
