import { execFileSync } from 'node:child_process';
import { allTopics, sections } from '../apps/api/prisma/data';

/**
 * Baza to'liq to'ldirilganini tekshiradi.
 *
 * `npm run seed` dan keyin ishga tushiring — nimaiki bo'lishi kerak bo'lsa,
 * o'shani bazadagi haqiqiy holat bilan solishtiradi va nima yetishmayotganini aytadi.
 *
 *   DATABASE_URL=postgresql://... npx tsx scripts/check-content.ts
 */

const PSQL = process.env.PSQL_BIN ?? 'psql';
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('\n  DATABASE_URL kerak.\n');
  process.exit(1);
}

let connectionChecked = false;

function query(sql: string): string[][] {
  try {
    return runQuery(sql);
  } catch (error) {
    if (!connectionChecked) {
      connectionChecked = true;
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes('Connection refused') || message.includes('could not connect')) {
        console.error('\n  Bazaga ulanib bo\u2018lmadi.');
        console.error(`  DATABASE_URL: ${String(DATABASE_URL).replace(/:[^:@]*@/, ':****@')}`);
        console.error('  Baza ishga tushganini va manzil to\u2018g\u2018riligini tekshiring.\n');
        process.exit(1);
      }
      if (message.includes('ENOENT')) {
        console.error('\n  `psql` topilmadi. PostgreSQL client o\u2018rnating yoki');
        console.error('  PSQL_BIN=/to\u2018liq/yo\u2018l/psql ko\u2018rsating.\n');
        process.exit(1);
      }
    }
    throw error;
  }
}

function runQuery(sql: string): string[][] {
  const out = execFileSync(PSQL, [DATABASE_URL as string, '-tAF', '\u0001', '-c', sql], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  return out
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split('\u0001'));
}

const problems: string[] = [];
const warnings: string[] = [];

// --- Sonlar ---
const [[sectionCount] = []] = query('SELECT count(*) FROM "Section"');
const [[topicCount] = []] = query('SELECT count(*) FROM "Topic"');
const [[simCount] = []] = query('SELECT count(*) FROM "Simulation"');
const [[adminCount] = []] = query('SELECT count(*) FROM "AdminUser"');

console.log('\n  === BAZA HOLATI ===\n');
console.log(`  Bo'limlar:        ${sectionCount} / ${sections.length}`);
console.log(`  Mavzular:         ${topicCount} / ${allTopics.length}`);
console.log(`  Simulyatsiyalar:  ${simCount} / ${allTopics.length}`);
console.log(`  Adminlar:         ${adminCount}`);

if (Number(sectionCount) !== sections.length) problems.push("Bo'limlar soni mos emas");
if (Number(topicCount) !== allTopics.length) problems.push('Mavzular soni mos emas');
if (Number(simCount) !== allTopics.length) problems.push('Simulyatsiyalar soni mos emas');
if (Number(adminCount) === 0) warnings.push('Admin hisobi yo\u2018q — npm run create:admin');

// --- Bo'limlar kesimi ---
console.log('\n  --- Bo\u2018limlar bo\u2018yicha ---');
const perSection = query(`
  SELECT s."code", s."titleUz", count(t."id"), s."color"
  FROM "Section" s LEFT JOIN "Topic" t ON t."sectionId" = s."id"
  GROUP BY s."id" ORDER BY s."order"
`);

const expectedPerSection = new Map(sections.map((s) => [s.code, s.topics.length]));

for (const [code, title, count] of perSection) {
  const expected = expectedPerSection.get(code ?? '');
  const actual = Number(count);
  const ok = expected === actual;
  if (!ok) problems.push(`${code}-bo'limda ${actual} mavzu, kutilgan ${expected}`);
  console.log(
    `  ${ok ? 'OK  ' : 'XATO'} ${(code ?? '').padEnd(3)} ${(title ?? '').padEnd(28)} ${String(actual).padStart(2)} mavzu`,
  );
}

// --- Simulyatsiya turlari ---
console.log('\n  --- Simulyatsiya holati ---');
const byKind = query(`SELECT "kind", "status", count(*) FROM "Simulation" GROUP BY 1,2 ORDER BY 1,2`);
const labels: Record<string, string> = {
  DEFAULT: 'Demo (avtomatik)',
  HTML: "To'liq (admin joylagan)",
  EXTERNAL: 'Tashqi manzil',
};
for (const [kind, status, count] of byKind) {
  console.log(`  ${(labels[kind ?? ''] ?? kind ?? '').padEnd(26)} ${(status ?? '').padEnd(10)} ${count}`);
}

// --- Yetishmayotgan mavzular ---
const dbSlugs = new Set(query('SELECT "slug" FROM "Topic"').map((row) => row[0]));
const missing = allTopics.filter((topic) => !dbSlugs.has(topic.slug));
if (missing.length > 0) {
  problems.push(`${missing.length} ta mavzu bazada yo'q`);
  console.log('\n  --- Yetishmayotgan mavzular ---');
  missing.slice(0, 15).forEach((topic) => console.log(`    - ${topic.code} ${topic.titleUz}`));
}

// --- Simulyatsiyasiz mavzular ---
const orphans = query(`
  SELECT t."code", t."titleUz" FROM "Topic" t
  LEFT JOIN "Simulation" s ON s."topicId" = t."id"
  WHERE s."id" IS NULL ORDER BY t."code"
`);
if (orphans.length > 0) {
  problems.push(`${orphans.length} ta mavzuda simulyatsiya yo'q`);
  console.log('\n  --- Simulyatsiyasiz mavzular ---');
  orphans.slice(0, 15).forEach(([code, title]) => console.log(`    - ${code} ${title}`));
}

// --- Mazmun sifati ---
const [[emptyTheory] = []] = query(`SELECT count(*) FROM "Topic" WHERE length("theory") < 400`);
const [[noFormulas] = []] = query(`SELECT count(*) FROM "Topic" WHERE jsonb_array_length("formulas") < 3`);
const [[noKeywords] = []] = query(`SELECT count(*) FROM "Topic" WHERE array_length("keywords", 1) IS NULL`);
const [[noConfig] = []] = query(`SELECT count(*) FROM "Simulation" WHERE "kind" = 'DEFAULT' AND "config" IS NULL`);

console.log('\n  --- Mazmun sifati ---');
console.log(`  Nazariyasi qisqa mavzular:        ${emptyTheory}`);
console.log(`  3 tadan kam formulali mavzular:   ${noFormulas}`);
console.log(`  Kalit so'zsiz mavzular:           ${noKeywords}`);
console.log(`  Config'siz demo simulyatsiyalar:  ${noConfig}`);

if (Number(emptyTheory) > 0) problems.push(`${emptyTheory} ta mavzuning nazariyasi qisqa`);
if (Number(noFormulas) > 0) problems.push(`${noFormulas} ta mavzuda formula yetarli emas`);
if (Number(noKeywords) > 0) problems.push(`${noKeywords} ta mavzuda kalit so'z yo'q`);
if (Number(noConfig) > 0) problems.push(`${noConfig} ta demo simulyatsiyada config yo'q`);

// --- Natija ---
console.log('');
for (const warning of warnings) console.log(`  OGOH  ${warning}`);
for (const problem of problems) console.log(`  XATO  ${problem}`);

if (problems.length > 0) {
  console.log('\n  Baza to\u2018liq emas. `npm run seed -w @physicslab/api` ni ishga tushiring.\n');
  process.exit(1);
}

console.log('\n  Baza to\u2018liq: barcha bo\u2018lim va simulyatsiyalar joyida.\n');
