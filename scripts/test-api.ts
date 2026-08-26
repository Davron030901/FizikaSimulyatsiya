import { writeFileSync } from 'node:fs';
import { createApp } from '../apps/api/src/app';

/** Public API endpointlarini uchdan-uchgacha tekshiradi. */

const app = createApp();
const server = app.listen(0);

function pad(v: string, n: number) { return v.length > n ? v.slice(0, n) : v.padEnd(n); }

async function main(): Promise<void> {
  const port = (server.address() as { port: number }).port;
  const base = `http://127.0.0.1:${port}`;
  let failures = 0;

  async function hit(label: string, path: string, expect: number) {
    const res = await fetch(base + path);
    const body = await res.text();
    const ok = res.status === expect;
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'OK  ' : 'XATO'} ${pad(String(res.status), 4)} ${pad(label, 38)} ${body.length} b`);
    return { res, body, type: res.headers.get('content-type') ?? '' };
  }

  console.log('\n  === PUBLIC ENDPOINTLAR ===');
  const index = await hit('API index', '/api', 200);
  const sections = await hit("Bo'limlar", '/api/sections', 200);
  await hit("Bo'lim: kinematika", '/api/sections/kinematika', 200);
  await hit("Bo'lim: mavjud emas", '/api/sections/mavjud-emas', 404);
  const topics = await hit('Mavzular', '/api/topics', 200);
  const filtered = await hit('Filtr + sahifa', '/api/topics?section=gravitatsiya&page=2&limit=4', 200);
  await hit('Qiyinlik filtri', '/api/topics?difficulty=QIYIN&limit=100', 200);
  const detail = await hit('Mavzu detali', '/api/topics/gidrostatik-bosim', 200);
  await hit('Mavzu: topilmadi', '/api/topics/yoq-mavzu', 404);
  const search = await hit('Qidiruv', '/api/search?q=bosim', 200);
  await hit('Qidiruv: qisqa', '/api/search?q=a', 400);
  await hit("Slug: noto'g'ri", '/api/topics/Katta_Harf', 400);
  await hit('Statistika', '/api/stats', 200);
  await hit('Mavjud emas', '/api/yoq', 404);

  console.log('\n  === SIMULYATSIYA ===');
  const meta = await hit('Sim meta', '/api/simulations/gidrostatik-bosim', 200);
  const embed = await hit('Embed (light)', '/api/simulations/gidrostatik-bosim/embed', 200);
  const dark = await hit('Embed (dark)', '/api/simulations/matematik-mayatnik/embed?theme=dark', 200);
  const missing = await hit('Embed: topilmadi', '/api/simulations/yoq-mavzu/embed', 404);

  console.log('\n  === MAZMUN ===');
  const checks: Array<[string, boolean]> = [];
  const sectionsData = JSON.parse(sections.body).data;
  const topicsMeta = JSON.parse(topics.body).meta;
  const filteredData = JSON.parse(filtered.body).data;
  const detailData = JSON.parse(detail.body).data;
  const metaData = JSON.parse(meta.body).data;

  checks.push(["9 ta bo'lim", sectionsData.length === 9]);
  checks.push(['topicCount kinematika = 8', sectionsData[0].topicCount === 8]);
  checks.push(['jami 79 mavzu', topicsMeta.total === 79]);
  checks.push(['totalPages = 4', topicsMeta.totalPages === 4]);
  checks.push(['filtr 4 ta natija', filteredData.length === 4]);
  checks.push(['filtr faqat gravitatsiya', filteredData.every((t: any) => t.section.slug === 'gravitatsiya')]);
  checks.push(['nazariya matni bor', detailData.theory.length > 400]);
  checks.push(['formulalar parse boldi', Array.isArray(detailData.formulas) && detailData.formulas[0].latex.length > 0]);
  checks.push(['oldingi 9.1', detailData.previous?.code === '9.1']);
  checks.push(['keyingi 9.3', detailData.next?.code === '9.3']);
  checks.push(['bogliq 3 ta', detailData.related.length === 3]);
  checks.push(['qidiruv natija berdi', JSON.parse(search.body).data.length > 0]);
  checks.push(['isDemo = true', metaData.isDemo === true]);
  checks.push(['embedUrl absolyut', String(metaData.embedUrl).startsWith('http')]);
  checks.push(['index FAZA nomi bor', String(JSON.parse(index.body).data.phase).length > 0]);

  const html = embed.body;
  checks.push(['embed doctype', html.startsWith('<!DOCTYPE html>')]);
  checks.push(['content-type html', embed.type.includes('text/html')]);
  checks.push(['canvas bor', html.includes('<canvas id="stage"')]);
  checks.push(['MathJax ulangan', html.includes('cdn.jsdelivr.net/npm/mathjax')]);
  checks.push(['2 slider', html.includes('id="paramARange"') && html.includes('id="paramBRange"')]);
  checks.push(['6 preset', (html.match(/<button type="button" data-preset=/g) ?? []).length === 6]);
  checks.push(['play/reset', html.includes('id="playBtn"') && html.includes('id="resetBtn"')]);
  checks.push(['postMessage', html.includes("type: 'sim:height'")]);
  checks.push(['demo ogohlantirishi', html.includes('Demo rejim')]);
  checks.push(['formula joyida', html.includes('\\rho g h')]);
  checks.push(['slider chegarasi configdan', html.includes('max="14000"')]);
  checks.push(['dark tema', dark.body.includes('<html lang="uz" class="dark"')]);
  checks.push(['light temada dark yoq', !html.includes('class="dark"')]);
  checks.push(['embed xatosi HTML', missing.body.includes('Simulyatsiya yuklanmadi')]);
  checks.push(['embed xatosi JSON emas', !missing.body.includes('"success"')]);
  checks.push(['CSP sarlavhasi', (embed.res.headers.get('content-security-policy') ?? '').includes('frame-ancestors')]);
  checks.push(['X-Frame-Options yoq', embed.res.headers.get('x-frame-options') === null]);
  checks.push(['embed keshlanadi', (embed.res.headers.get('cache-control') ?? '').includes('max-age=300')]);

  for (const [label, ok] of checks) {
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'OK  ' : 'XATO'} ${label}`);
  }

  writeFileSync('/tmp/embed-sample.html', html);
  console.log(`\n  Xatolar: ${failures}\n`);
  server.close();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e: unknown) => { console.error(e); server.close(); process.exit(1); });
