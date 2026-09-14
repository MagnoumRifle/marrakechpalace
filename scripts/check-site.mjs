import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const routes = ['/', '/le-domaine', '/les-villas', '/galerie', '/localisation', '/documents', '/contact'];
const referencedAssets = new Set();
const titles = new Set();
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.match(html, /<html[^>]+lang="fr"/, `${route}: French document`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: single main heading`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `${route}: unique metadata`);
  titles.add(title);
  assert.match(html, /wa.me\/212631857034/, `${route}: WhatsApp contact`);
  for (const match of html.matchAll(/url=(%2Fmedia%2F[^&"\s]+)/g)) referencedAssets.add(decodeURIComponent(match[1]));
  console.log(`PASS ${route}`);
}
const manifest = JSON.parse(await readFile(path.join(root, 'src/lib/media.json'), 'utf8'));
manifest.forEach(item => referencedAssets.add(item.src));
for (const asset of referencedAssets) assert.ok((await stat(path.join(root, 'public', asset))).size > 0, asset);
for (const file of ['/documents/marrakech-palace-brochure.pdf', '/documents/marrakech-palace-cps.pdf']) {
  const response = await fetch(base + file, { headers: { Range: 'bytes=0-15' } });
  assert.equal(response.status, 206, `${file}: supports partial download`);
  assert.match(response.headers.get('content-type') || '', /application\/pdf/);
  assert.ok((await response.text()).startsWith('%PDF'), file);
  console.log(`PASS ${file}`);
}
const video = await fetch(base + '/media/hero.mp4', { headers: { Range: 'bytes=0-31' } });
assert.equal(video.status, 206, 'Hero video supports byte ranges');
assert.match(video.headers.get('content-type') || '', /video\/mp4/);
assert.equal((await video.arrayBuffer()).byteLength, 32);
assert.equal((await fetch(base + '/page-inexistante')).status, 404);
assert.equal((await fetch(base + '/robots.txt')).status, 200);
assert.equal((await fetch(base + '/sitemap.xml')).status, 200);
console.log(`PASS ${referencedAssets.size} local image references, video streaming, metadata and 404`);
