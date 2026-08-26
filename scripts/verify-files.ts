import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/**
 * Repo yaxlitligini tekshiradi.
 *
 * Fayllarni nusxalash yoki arxivdan chiqarishda ba'zan fayl ustiga boshqa fayl
 * yozilib qoladi (masalan `src/index.ts` ichiga `src/routes/index.ts` mazmuni).
 * Bunday xato faqat build paytida, tushunarsiz TS2307 xatolari bilan chiqadi.
 * Bu skript uni bir soniyada topadi.
 *
 *   npx tsx scripts/verify-files.ts            # tekshirish
 *   npx tsx scripts/verify-files.ts --write    # manifestni qayta yozish
 */

const MANIFEST = 'MANIFEST.sha256';
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.vercel',
  'coverage',
]);
const SKIP_FILES = new Set([MANIFEST, '.DS_Store']);

function walk(dir: string, root: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      walk(full, root, out);
      continue;
    }
    if (SKIP_FILES.has(entry)) continue;
    if (entry.endsWith('.log') || entry === '.env' || entry.startsWith('.env.')) continue;
    out.push(relative(root, full).split(sep).join('/'));
  }
  return out;
}

function hash(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

const root = process.cwd();
const files = walk(root, root).sort();
const write = process.argv.includes('--write');

if (write) {
  const lines = files.map((file) => `${hash(file)}  ${file}`);
  writeFileSync(MANIFEST, `${lines.join('\n')}\n`);
  console.log(`\n  ${MANIFEST} yozildi: ${files.length} ta fayl.\n`);
  process.exit(0);
}

let expected: Map<string, string>;
try {
  expected = new Map(
    readFileSync(MANIFEST, 'utf8')
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const [sum, ...rest] = line.split('  ');
        return [rest.join('  '), sum ?? ''] as [string, string];
      }),
  );
} catch {
  console.error(`\n  ${MANIFEST} topilmadi. Avval --write bilan yarating.\n`);
  process.exit(1);
}

const missing: string[] = [];
const changed: string[] = [];
const extra: string[] = [];
const present = new Set(files);

for (const [file, sum] of expected) {
  if (!present.has(file)) {
    missing.push(file);
    continue;
  }
  if (hash(file) !== sum) changed.push(file);
}

for (const file of files) {
  if (!expected.has(file)) extra.push(file);
}

console.log('\n  === REPO YAXLITLIGI ===');
console.log(`  Kutilgan fayllar: ${expected.size}`);
console.log(`  Topilgan:         ${files.length}`);

if (missing.length > 0) {
  console.log(`\n  YETISHMAYDI (${missing.length}):`);
  missing.forEach((file) => console.log(`    - ${file}`));
}

if (changed.length > 0) {
  console.log(`\n  MAZMUNI BOSHQACHA (${changed.length}):`);
  for (const file of changed) {
    // Fayl ichiga boshqa faylning mazmuni tushib qolgan bo'lsa, uni topamiz.
    const actual = hash(file);
    const swappedWith = [...expected].find(([other, sum]) => sum === actual && other !== file);
    const note = swappedWith ? `  <-- bu aslida "${swappedWith[0]}" mazmuni!` : '';
    console.log(`    ~ ${file}${note}`);
  }
}

if (extra.length > 0) {
  console.log(`\n  QO'SHIMCHA (manifestda yo'q, ${extra.length}):`);
  extra.slice(0, 20).forEach((file) => console.log(`    + ${file}`));
}

const problems = missing.length + changed.length;
console.log('');

if (problems > 0) {
  console.log(`  ${problems} ta muammo topildi. Fayllarni arxivdan qayta chiqaring.\n`);
  process.exit(1);
}

console.log('  Barcha fayllar joyida va o\u2018zgarmagan.\n');
