import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';
const root = path.resolve('out');
const port = Number(process.env.PORT || 3100);
const rules = JSON.parse(await readFile('amplify-redirects.json', 'utf8'));
const headerConfig = (await readFile('customHttp.yml', 'utf8')).split(
  "  - pattern: '/images/**'",
)[0];
const headers = Object.fromEntries(
  [...headerConfig.matchAll(/- key: ['"]([^'"]+)['"]\s+value: (.+)/g)].map((match) => [
    match[1],
    match[2].trim().slice(1, -1),
  ]),
);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
  '.png': 'image/png',
  '.webp': 'image/webp',
};
createServer(async (req, res) => {
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  try {
    const incoming = new URL(req.url || '/', 'http://localhost');
    const pathname = decodeURIComponent(incoming.pathname);
    const redirect = rules.find((rule) => rule.status === '301' && rule.source === pathname);
    if (redirect) {
      const destination = new URL(redirect.target, 'http://localhost');
      if (!destination.search) destination.search = incoming.search;
      res.writeHead(301, {
        Location: destination.pathname + destination.search + destination.hash,
      });
      return res.end();
    }
    let file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      return res.end();
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let body = await readFile(file);
    const extension = path.extname(file);
    if (/\.(html|js|css|json|svg|txt|xml)$/.test(file)) {
      const accepted = req.headers['accept-encoding'] || '';
      if (accepted.includes('br')) {
        body = brotliCompressSync(body);
        res.setHeader('Content-Encoding', 'br');
      } else if (accepted.includes('gzip')) {
        body = gzipSync(body);
        res.setHeader('Content-Encoding', 'gzip');
      }
      res.setHeader('Vary', 'Accept-Encoding');
    }
    if (extension === '.woff2') res.setHeader('Cache-Control', 'public, max-age=86400');
    if (extension === '.webp') res.setHeader('Cache-Control', 'public, max-age=3600');
    if (pathname.startsWith('/_next/static/'))
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    try {
      res.end(await readFile(path.join(root, '404.html')));
    } catch {
      res.end('Önce npm run build çalıştırın.');
    }
  }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://localhost:${port}`));
