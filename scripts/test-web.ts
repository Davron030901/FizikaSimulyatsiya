import { spawn } from 'node:child_process';
import { createApp } from '../apps/api/src/app';

/**
 * Frontend sahifalarini uchdan-uchgacha tekshiradi.
 * `npm run build:web` avval bajarilgan bo'lishi kerak.
 * API 4099-portda ko'tariladi (build shu manzil bilan qilingan bo'lsin).
 */

const API_PORT = Number(process.env.TEST_API_PORT ?? 4099);
const WEB_PORT = Number(process.env.TEST_WEB_PORT ?? 3111);

const apiServer = createApp().listen(API_PORT);
const web = spawn('../../node_modules/.bin/next', ['start', '-p', String(WEB_PORT)], {
  cwd: 'apps/web',
  env: { ...process.env, NEXT_PUBLIC_API_URL: `http://127.0.0.1:${API_PORT}` },
  stdio: 'ignore',
});

function pad(v: string, n: number) { return v.length > n ? v.slice(0, n) : v.padEnd(n); }

async function main(): Promise<void> {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${WEB_PORT}/`);
      if (res.status < 500) break;
    } catch { /* kutamiz */ }
    await new Promise((r) => setTimeout(r, 500));
  }

  const base = `http://127.0.0.1:${WEB_PORT}`;
  let failures = 0;

  async function page(label: string, path: string, expect = 200) {
    const res = await fetch(base + path);
    const html = await res.text();
    const ok = res.status === expect;
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'OK  ' : 'XATO'} ${pad(String(res.status), 4)} ${pad(label, 32)} ${Math.round(html.length / 1024)} KB`);
    return html;
  }

  console.log('\n  === SAHIFALAR ===');
  const home = await page('Bosh sahifa', '/');
  const sections = await page("Bo'limlar", '/bolimlar');
  const section = await page("Bo'lim: suyuqlik", '/bolimlar/suyuqlik-mexanikasi');
  await page("Bo'lim: mavjud emas", '/bolimlar/yoq-bolim', 404);
  const topic = await page('Mavzu: 9.2', '/simulyatsiya/gidrostatik-bosim');
  const first = await page('Mavzu: 1.1', '/simulyatsiya/tekis-togri-chiziqli-harakat');
  await page('Mavzu: mavjud emas', '/simulyatsiya/yoq-mavzu', 404);
  const search = await page('Qidiruv', '/qidiruv?q=bosim');
  const empty = await page('Qidiruv: natijasiz', '/qidiruv?q=zzzqqq');
  await page("Qidiruv: so'rovsiz", '/qidiruv');
  await page('Haqida', '/haqida');
  await page('Admin login', '/admin/login');
  await page('404 sahifa', '/mavjud-emas', 404);
  const sitemap = await page('sitemap.xml', '/sitemap.xml');
  await page('robots.txt', '/robots.txt');
  await page('manifest', '/manifest.webmanifest');

  console.log('\n  === MAZMUN ===');
  const checks: Array<[string, boolean]> = [];
  checks.push(["bosh: 9 bo'lim havolasi", (home.match(/href="\/bolimlar\//g) ?? []).length >= 9]);
  checks.push(['bosh: qidiruv formasi', home.includes('role="search"')]);
  checks.push(['bosh: WebSite JSON-LD', home.includes('SearchAction')]);
  checks.push(["bo'limlar: 9 ta karta", (sections.match(/href="\/bolimlar\//g) ?? []).length === 9]);
  checks.push(["bo'lim: 12 ta mavzu", (section.match(/href="\/simulyatsiya\//g) ?? []).length === 12]);
  checks.push(["bo'lim: Course JSON-LD", section.includes('"Course"')]);
  checks.push(["bo'lim: rang qollangan", section.includes('#0EA5E9')]);
  checks.push(['mavzu: sarlavha', topic.includes('Gidrostatik bosim')]);
  checks.push(['mavzu: nazariya server tomonda', topic.includes('Suyuqlik ichidagi bosim')]);
  checks.push(['mavzu: LearningResource JSON-LD', topic.includes('LearningResource')]);
  checks.push(['mavzu: BreadcrumbList', topic.includes('BreadcrumbList')]);
  checks.push(['mavzu: oldingi 9.1', topic.includes('/simulyatsiya/zichlik')]);
  checks.push(['mavzu: keyingi 9.3', topic.includes('/simulyatsiya/pascal-qonuni')]);
  checks.push(['mavzu: demo badge', topic.includes('Demo rejim')]);
  checks.push(['1.1 da oldingi yoq', !first.includes('Oldingi ·')]);
  checks.push(['1.1 da keyingi bor', first.includes('Keyingi ·')]);
  checks.push(['qidiruv natija berdi', search.includes('natija') && search.includes('/simulyatsiya/')]);
  checks.push(['bosh qidiruv xabari', empty.includes('Hech narsa topilmadi')]);
  checks.push(['sitemap 79 mavzu', (sitemap.match(/\/simulyatsiya\//g) ?? []).length === 79]);
  checks.push(["sitemap 9 bo'lim", (sitemap.match(/\/bolimlar\//g) ?? []).length === 9]);
  checks.push(['mobil menyu', home.includes('Mobil menyu')]);
  checks.push(['skip-link', home.includes('Asosiy mazmunga')]);
  checks.push(['lang="uz"', home.includes('lang="uz"')]);
  checks.push(['tema skripti', home.includes('physicslab-theme')]);

  for (const [label, ok] of checks) {
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'OK  ' : 'XATO'} ${label}`);
  }

  console.log(`\n  Xatolar: ${failures}\n`);
  web.kill();
  apiServer.close();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e: unknown) => { console.error(e); web.kill(); apiServer.close(); process.exit(1); });
