import { allTopics } from '../apps/api/prisma/data';
import { createApp } from '../apps/api/src/app';

const TOTAL_TOPICS = allTopics.length;

/**
 * Admin oqimini uchdan-uchgacha tekshiradi: login -> qoralama -> nashr -> reset.
 * ADMIN_EMAIL va ADMIN_PASSWORD env o'zgaruvchilari kerak.
 * Testdan keyin simulyatsiya demo holatiga qaytariladi.
 */

const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;
const SLUG = process.env.TEST_TOPIC_SLUG ?? 'gidrostatik-bosim';

if (!EMAIL || !PASSWORD) {
  console.error('\n  ADMIN_EMAIL va ADMIN_PASSWORD kerak.\n');
  process.exit(1);
}

const app = createApp();
const server = app.listen(0);

const GOOD_HTML = `<!DOCTYPE html>
<html lang="uz">
<head><meta charset="utf-8"><title>Test</title>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
</head>
<body><canvas id="c"></canvas><script>console.log('test-marker');</script></body>
</html>`;

function pad(v: string, n: number) { return v.length > n ? v.slice(0, n) : v.padEnd(n); }

async function main(): Promise<void> {
  const port = (server.address() as { port: number }).port;
  const base = `http://127.0.0.1:${port}`;
  let failures = 0;
  let token = '';

  async function call(label: string, method: string, path: string, expect: number, body?: unknown, auth = true) {
    const res = await fetch(base + path, {
      method,
      headers: { 'Content-Type': 'application/json', ...(auth && token ? { Authorization: `Bearer ${token}` } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const text = await res.text();
    const ok = res.status === expect;
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'OK  ' : 'XATO'} ${pad(String(res.status), 4)} ${pad(label, 42)}`);
    let json: any = null;
    try { json = JSON.parse(text); } catch { /* html */ }
    return { res, text, json };
  }

  console.log('\n  === AUTENTIFIKATSIYA ===');
  await call('Tokensiz kirish rad etildi', 'GET', '/api/admin/topics', 401, undefined, false);
  await call("Noto'g'ri parol", 'POST', '/api/auth/login', 401, { email: EMAIL, password: 'xato-parol-123' }, false);
  await call('Mavjud emas email', 'POST', '/api/auth/login', 401, { email: 'yoq@example.com', password: PASSWORD }, false);
  await call('Email formati buzuq', 'POST', '/api/auth/login', 400, { email: 'email-emas', password: PASSWORD }, false);

  const login = await call('Kirish', 'POST', '/api/auth/login', 200, { email: EMAIL, password: PASSWORD }, false);
  token = login.json?.data?.token ?? '';
  await call('/auth/me', 'GET', '/api/auth/me', 200);

  const real = token; token = 'buzuq.token.qiymati';
  await call('Soxta token rad etildi', 'GET', '/api/admin/topics', 401);
  token = real;

  console.log('\n  === ADMIN ENDPOINTLAR ===');
  const topics = await call('Mavzular jadvali', 'GET', '/api/admin/topics', 200);
  await call('Admin statistikasi', 'GET', '/api/admin/stats', 200);
  const sim = await call('Simulyatsiya detali', 'GET', `/api/admin/simulations/${SLUG}`, 200);
  await call('Mavjud emas mavzu', 'GET', '/api/admin/simulations/yoq-mavzu', 404);

  console.log('\n  === HTML VALIDATSIYASI ===');
  await call("Bo'sh HTML", 'PUT', `/api/admin/simulations/${SLUG}`, 400, { kind: 'HTML', status: 'DRAFT', htmlContent: '' });
  await call('<html> yoq', 'PUT', `/api/admin/simulations/${SLUG}`, 400, { kind: 'HTML', status: 'DRAFT', htmlContent: '<div>salom</div>' });
  await call('Ruxsatsiz CDN', 'PUT', `/api/admin/simulations/${SLUG}`, 400, { kind: 'HTML', status: 'DRAFT', htmlContent: GOOD_HTML.replace('cdn.jsdelivr.net', 'evil-cdn.example.com') });
  await call('Nisbiy skript yoli', 'PUT', `/api/admin/simulations/${SLUG}`, 400, { kind: 'HTML', status: 'DRAFT', htmlContent: GOOD_HTML.replace('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js', '/local/script.js') });
  await call('EXTERNAL manzilsiz', 'PUT', `/api/admin/simulations/${SLUG}`, 400, { kind: 'EXTERNAL', status: 'DRAFT' });

  console.log('\n  === TAHRIRLASH OQIMI ===');
  const before = sim.json?.data?.simulation?.version ?? 1;
  const draft = await call('Qoralama saqlash', 'PUT', `/api/admin/simulations/${SLUG}`, 200, { kind: 'HTML', status: 'DRAFT', htmlContent: GOOD_HTML });
  const embedDraft = await call('Qoralama: omma demo koradi', 'GET', `/api/simulations/${SLUG}/embed`, 200, undefined, false);
  const embedPreview = await call('Qoralama: preview asl kod', 'GET', `/api/simulations/${SLUG}/embed?preview=1`, 200, undefined, false);
  const published = await call('Nashr qilish', 'PUT', `/api/admin/simulations/${SLUG}`, 200, { kind: 'HTML', status: 'PUBLISHED', htmlContent: GOOD_HTML });
  const embedLive = await call('Nashrdan keyin asl kod', 'GET', `/api/simulations/${SLUG}/embed`, 200, undefined, false);
  const same = await call('Ozgarishsiz qayta saqlash', 'PUT', `/api/admin/simulations/${SLUG}`, 200, { kind: 'HTML', status: 'PUBLISHED', htmlContent: GOOD_HTML });
  const reset = await call('Demo holatiga qaytarish', 'POST', `/api/admin/simulations/${SLUG}/reset`, 200);
  const embedReset = await call('Reset: demo qaytdi', 'GET', `/api/simulations/${SLUG}/embed`, 200, undefined, false);

  console.log('\n  === MAZMUN ===');
  const checks: Array<[string, boolean]> = [];
  checks.push(['login token qaytardi', typeof login.json?.data?.token === 'string']);
  checks.push(['login parol hashini qaytarmadi', !login.text.includes('$2')]);
  checks.push([`${TOTAL_TOPICS} ta mavzu jadvalda`, topics.json?.data?.length === TOTAL_TOPICS]);
  checks.push(['jadvalda kind bor', typeof topics.json?.data?.[0]?.kind === 'string']);
  checks.push(['admin simda config bor', sim.json?.data?.simulation?.config != null]);
  checks.push(['qoralama versiyasi oshdi', draft.json?.data?.version === before + 1]);
  checks.push(['qoralama statusi DRAFT', draft.json?.data?.status === 'DRAFT']);
  checks.push(['qoralama omma uchun demo', embedDraft.text.includes('Demo rejim')]);
  checks.push(['preview asl kodni berdi', embedPreview.text.includes('test-marker')]);
  checks.push(['preview keshlanmaydi', (embedPreview.res.headers.get('cache-control') ?? '').includes('no-store')]);
  checks.push(['nashr statusi PUBLISHED', published.json?.data?.status === 'PUBLISHED']);
  checks.push(['nashrdan keyin asl kod', embedLive.text.includes('test-marker')]);
  checks.push(['nashrdan keyin demo emas', !embedLive.text.includes('Demo rejim')]);
  checks.push(['ozgarishsiz saqlashda versiya oshmadi', same.json?.data?.version === published.json?.data?.version]);
  checks.push(['reset kind DEFAULT', reset.json?.data?.kind === 'DEFAULT']);
  checks.push(['reset demo qaytardi', embedReset.text.includes('Demo rejim')]);
  checks.push(['reset config saqladi', embedReset.text.includes('id="paramARange"')]);

  for (const [label, ok] of checks) {
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'OK  ' : 'XATO'} ${label}`);
  }

  console.log(`\n  Xatolar: ${failures}\n`);
  server.close();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e: unknown) => { console.error(e); server.close(); process.exit(1); });
