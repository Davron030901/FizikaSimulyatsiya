import { spawn } from 'node:child_process';
import { createApp } from '../apps/api/src/app';

/** FloatingSymbols: determinizm, a11y va CSS to'g'riligini tekshiradi. */

const apiServer = createApp().listen(4099);
const WEB_PORT = 3120;
const web = spawn('../../node_modules/.bin/next', ['start', '-p', String(WEB_PORT)], {
  cwd: 'apps/web',
  env: { ...process.env, NEXT_PUBLIC_API_URL: 'http://127.0.0.1:4099' },
  stdio: 'ignore',
});

function extractSymbolBlock(html: string): string {
  const start = html.indexOf('physics-symbol');
  if (start < 0) return '';
  const containerStart = html.lastIndexOf('<div', start);
  const end = html.indexOf('</div>', html.lastIndexOf('</span>', html.length));
  return html.slice(containerStart, end > 0 ? end : undefined);
}

async function main(): Promise<void> {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${WEB_PORT}/`);
      if (res.status < 500) break;
    } catch {
      /* kutamiz */
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  const base = `http://127.0.0.1:${WEB_PORT}`;
  const checks: Array<[string, boolean]> = [];
  let failures = 0;

  // Uch marta so'raymiz — natija har safar bir xil bo'lishi shart,
  // aks holda hydration mismatch va ekranda titrash bo'ladi.
  const renders = await Promise.all([
    fetch(base + '/').then((r) => r.text()),
    fetch(base + '/').then((r) => r.text()),
    fetch(base + '/').then((r) => r.text()),
  ]);

  const blocks = renders.map(extractSymbolBlock);
  const first = blocks[0] ?? '';

  checks.push(['belgilar SSR HTML ichida bor', first.length > 0]);
  checks.push(['3 ta renderda natija bir xil', blocks.every((block) => block === first)]);

  const spanCount = (first.match(/class="physics-symbol"/g) ?? []).length;
  checks.push([`28 ta belgi chizildi (topildi: ${spanCount})`, spanCount === 28]);

  checks.push(['konteyner aria-hidden', /aria-hidden="true"[^>]*class="[^"]*fixed inset-0/.test(first) || first.includes('aria-hidden="true"')]);
  checks.push(['pointer-events-none', first.includes('pointer-events-none')]);
  checks.push(['-z-10 (mazmun ortida)', first.includes('-z-10')]);

  checks.push(['CSS o\u2018zgaruvchilari berilgan', first.includes('--symbol-opacity') && first.includes('--symbol-drift')]);
  checks.push(['animatsiya davomiyligi berilgan', /animation-duration:\s*\d/.test(first)]);
  checks.push(['manfiy kechikish (o\u2018rtadan boshlanadi)', /animation-delay:\s*-\d/.test(first)]);

  const hasFormula = /F = ma|E = mc|v = λf|P = ρgh|p = mv|W = Fs|F = -kx|a = v²\/r|E = ½mv²|T = 2π/.test(first);
  checks.push(['formulalar ham uchraydi', hasFormula]);

  const hasGreek = /[ωαθλρμΔΣπηφγΩτεν]/.test(first);
  checks.push(['grek harflari bor', hasGreek]);
  const hasLatin = />[a-zA-Z]<\/span>/.test(first);
  checks.push(['lotin harflari bor', hasLatin]);

  // Admin login sahifasi kamroq belgi bilan
  const login = await fetch(base + '/admin/login').then((r) => r.text());
  const loginCount = (login.match(/class="physics-symbol"/g) ?? []).length;
  checks.push([`login sahifasida 16 ta (topildi: ${loginCount})`, loginCount === 16]);

  // Mazmun sahifalarida bo'lmasligi kerak — o'qishga xalaqit bermasin
  const topic = await fetch(base + '/simulyatsiya/gidrostatik-bosim').then((r) => r.text());
  checks.push(['mavzu sahifasida yo\u2018q', !topic.includes('physics-symbol')]);

  // CSS build ichiga tushganini tekshiramiz
  const cssHref = (renders[0] ?? '').match(/href="(\/_next\/static\/css\/[^"]+\.css)"/)?.[1];
  checks.push(['CSS fayli topildi', Boolean(cssHref)]);
  if (cssHref) {
    const css = await fetch(base + cssHref).then((r) => r.text());
    checks.push(['@keyframes symbol-float build ichida', css.includes('symbol-float')]);
    checks.push(['.physics-symbol qoidasi bor', css.includes('.physics-symbol')]);
    checks.push(['prefers-reduced-motion qoidasi bor', css.includes('prefers-reduced-motion')]);
  }

  console.log('\n  === SUZUVCHI BELGILAR ===\n');
  for (const [label, ok] of checks) {
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'OK  ' : 'XATO'} ${label}`);
  }

  const sample = [...first.matchAll(/>([^<]{1,14})<\/span>/g)].slice(0, 12).map((m) => m[1]);
  console.log(`\n  Namuna: ${sample.join('  ')}`);
  console.log(`\n  Xatolar: ${failures}\n`);

  web.kill();
  apiServer.close();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error: unknown) => {
  console.error(error);
  web.kill();
  apiServer.close();
  process.exit(1);
});
