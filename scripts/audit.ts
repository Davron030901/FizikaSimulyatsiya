import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createApp } from '../apps/api/src/app';

/**
 * Static audit of the rendered HTML.
 *
 * This is NOT Lighthouse — there is no browser here, so nothing that needs layout,
 * paint or JS execution is measured. What it does check is everything visible in the
 * server-rendered markup plus the WCAG contrast of the design tokens.
 */

const api = createApp();
const apiServer = api.listen(4099);
const WEB_PORT = 3113;

const web = spawn('../../node_modules/.bin/next', ['start', '-p', String(WEB_PORT)], {
  cwd: 'apps/web',
  env: { ...process.env, NEXT_PUBLIC_API_URL: 'http://127.0.0.1:4099' },
  stdio: 'ignore',
});

interface Finding {
  page: string;
  message: string;
  level: 'error' | 'warn';
}

const findings: Finding[] = [];
const passed: string[] = [];

function check(page: string, label: string, ok: boolean, level: 'error' | 'warn' = 'error') {
  if (ok) passed.push(`${page}: ${label}`);
  else findings.push({ page, message: label, level });
}

// ---------- WCAG contrast ----------

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0]
    : h < 120 ? [x, c, 0]
    : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c]
    : h < 300 ? [x, 0, c]
    : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

function luminance([r, g, b]: [number, number, number]): number {
  const channel = (value: number) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: string, b: string): number {
  const parse = (value: string): [number, number, number] => {
    const [h, s, l] = value.split(' ').map((part) => Number.parseFloat(part));
    return hslToRgb(h ?? 0, s ?? 0, l ?? 0);
  };
  const l1 = luminance(parse(a));
  const l2 = luminance(parse(b));
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return ((light as number) + 0.05) / ((dark as number) + 0.05);
}

function auditContrast(): void {
  const css = readFileSync('apps/web/src/app/globals.css', 'utf8');

  function token(name: string, scope: 'root' | 'dark'): string {
    const block = scope === 'root' ? css.split(':root {')[1] : css.split('.dark {')[1];
    const match = block?.match(new RegExp(`--${name}:\\s*([^;]+);`));
    return (match?.[1] ?? '0 0% 0%').trim();
  }

  const pairs: Array<[string, string, string, number]> = [
    ['matn / fon', 'foreground', 'background', 4.5],
    ['ikkilamchi matn / fon', 'muted-foreground', 'background', 4.5],
    ['ikkilamchi matn / karta', 'muted-foreground', 'card', 4.5],
    ['chegara / fon', 'border', 'background', 1.5],
  ];

  for (const scope of ['root', 'dark'] as const) {
    const label = scope === 'root' ? 'light' : 'dark';
    for (const [name, fg, bg, min] of pairs) {
      const ratio = contrast(token(fg, scope), token(bg, scope));
      check(
        `kontrast/${label}`,
        `${name} = ${ratio.toFixed(2)}:1 (kerak ≥ ${min})`,
        ratio >= min,
        min >= 4.5 ? 'error' : 'warn',
      );
    }
  }
}

// ---------- HTML audit ----------

function auditHtml(page: string, html: string): void {
  const headings = [...html.matchAll(/<h([1-6])[^>]*>/gi)].map((match) => Number(match[1]));
  const h1Count = headings.filter((level) => level === 1).length;

  check(page, 'aniq bitta <h1>', h1Count === 1);

  let previous = 0;
  let orderOk = true;
  for (const level of headings) {
    if (previous && level > previous + 1) orderOk = false;
    previous = level;
  }
  check(page, "sarlavhalar tartibi buzilmagan (h2 dan keyin h4 emas)", orderOk);

  check(page, 'lang atributi bor', /<html[^>]+lang="uz"/.test(html));
  check(page, '<title> bor', /<title>[^<]{5,}<\/title>/.test(html));

  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  check(page, `description uzunligi (${description.length})`, description.length >= 50 && description.length <= 300);

  check(page, 'viewport meta bor', /name="viewport"/.test(html));
  check(page, 'canonical havola bor', /rel="canonical"/.test(html), 'warn');
  check(page, 'og:title bor', /property="og:title"/.test(html), 'warn');

  const images = [...html.matchAll(/<img\b[^>]*>/gi)];
  check(page, `barcha <img> da alt bor (${images.length} ta)`, images.every((img) => /\salt=/.test(img[0])));

  const iframes = [...html.matchAll(/<iframe\b[^>]*>/gi)];
  check(page, `barcha <iframe> da title bor (${iframes.length} ta)`, iframes.every((frame) => /\stitle=/.test(frame[0])));

  const inputs = [...html.matchAll(/<input\b[^>]*>/gi)].filter(
    (input) => !/type="(hidden|submit|button)"/.test(input[0]),
  );
  check(
    page,
    `barcha input da nom bor (${inputs.length} ta)`,
    inputs.every((input) => /aria-label=|aria-labelledby=|\sid="/.test(input[0])),
  );

  const buttonsWithoutText = [...html.matchAll(/<button\b[^>]*>\s*<\/button>/gi)];
  check(page, 'bo\u2018sh <button> yo\u2018q', buttonsWithoutText.length === 0);

  const links = [...html.matchAll(/<a\b[^>]*>(.*?)<\/a>/gis)];
  const emptyLinks = links.filter(
    (link) => !/aria-label=/.test(link[0]) && (link[1] ?? '').replace(/<[^>]*>/g, '').trim().length === 0,
  );
  check(page, `nomsiz havola yo'q (${links.length} ta havola)`, emptyLinks.length === 0);

  const externalLinks = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)];
  check(
    page,
    'target="_blank" havolalarda rel bor',
    externalLinks.every((link) => /rel="[^"]*noreferrer|rel="[^"]*noopener/.test(link[0])),
    'warn',
  );

  check(page, 'inline event handler yo\u2018q (onclick=)', !/\sonclick=/i.test(html), 'warn');
}

async function main(): Promise<void> {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${WEB_PORT}/`);
      if (res.status < 500) break;
    } catch {
      /* keep polling */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const base = `http://127.0.0.1:${WEB_PORT}`;
  const pages = [
    ['/', 'bosh'],
    ['/bolimlar', "bo'limlar"],
    ['/bolimlar/kinematika', "bo'lim"],
    ['/simulyatsiya/gidrostatik-bosim', 'mavzu'],
    ['/qidiruv?q=bosim', 'qidiruv'],
    ['/haqida', 'haqida'],
  ] as const;

  console.log('\n  === SAHIFA AUDITI ===');
  for (const [path, label] of pages) {
    const res = await fetch(base + path);
    const html = await res.text();
    auditHtml(label, html);
    console.log(`  ${label.padEnd(12)} ${res.status}  ${Math.round(html.length / 1024)} KB`);
  }

  console.log('\n  === QO\u2018SHIMCHA MARSHRUTLAR ===');
  for (const path of ['/manifest.webmanifest', '/icon.svg', '/robots.txt', '/sitemap.xml', '/opengraph-image']) {
    const res = await fetch(base + path);
    const ok = res.ok;
    check('marshrut', `${path} → ${res.status}`, ok);
    console.log(`  ${ok ? 'OK  ' : 'XATO'} ${path.padEnd(26)} ${res.status} ${res.headers.get('content-type') ?? ''}`);
  }

  const ogTopic = await fetch(`${base}/simulyatsiya/gidrostatik-bosim/opengraph-image`);
  check('marshrut', `mavzu OG rasmi → ${ogTopic.status}`, ogTopic.ok);
  console.log(`  ${ogTopic.ok ? 'OK  ' : 'XATO'} ${'mavzu OG rasmi'.padEnd(26)} ${ogTopic.status} ${ogTopic.headers.get('content-type') ?? ''}`);

  console.log('\n  === KONTRAST (WCAG) ===');
  auditContrast();
  for (const item of passed.filter((p) => p.startsWith('kontrast'))) {
    console.log(`  OK   ${item}`);
  }

  const errors = findings.filter((f) => f.level === 'error');
  const warnings = findings.filter((f) => f.level === 'warn');

  console.log(`\n  === NATIJA ===`);
  console.log(`  Muvaffaqiyatli: ${passed.length}`);
  console.log(`  Ogohlantirish:  ${warnings.length}`);
  console.log(`  Xatolar:        ${errors.length}\n`);

  for (const finding of findings) {
    console.log(`  ${finding.level === 'error' ? 'XATO' : 'OGOH'} [${finding.page}] ${finding.message}`);
  }
  console.log('');

  web.kill();
  apiServer.close();
  process.exit(errors.length === 0 ? 0 : 1);
}

main().catch((error: unknown) => {
  console.error(error);
  web.kill();
  apiServer.close();
  process.exit(1);
});
