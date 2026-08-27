import { writeFileSync } from 'node:fs';
import { sections } from '../apps/api/prisma/data';

/**
 * Seed ma'lumotlarini oddiy SQL fayliga aylantiradi.
 *
 * Asosiy yo'l — `npm run seed` (Prisma orqali). Bu skript zaxira variant:
 * Prisma engine'larini yuklab bo'lmaydigan tarmoqlarda yoki bazani to'g'ridan-to'g'ri
 * `psql -f` bilan to'ldirish kerak bo'lganda ishlatiladi.
 *
 *   npx tsx scripts/export-sql.ts > /tmp/seed.sql
 *   psql "$DATABASE_URL" -f /tmp/seed.sql
 *
 * Fayl idempotent: ON CONFLICT bilan qayta yuklash mumkin, admin qo'ygan
 * simulyatsiyalar (kind <> 'DEFAULT') o'zgarmaydi.
 */

const OUT = process.argv[2] ?? 'seed.sql';

/** PostgreSQL matn literali. Apostroflar ikkilantiriladi. */
function q(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function jsonLiteral(value: unknown): string {
  return `${q(JSON.stringify(value))}::jsonb`;
}

function textArray(values: string[]): string {
  if (values.length === 0) return `ARRAY[]::text[]`;
  return `ARRAY[${values.map(q).join(', ')}]::text[]`;
}

const lines: string[] = [
  '-- PhysicsLab UZ — seed (avtomatik yaratilgan, qo\u2018lda tahrirlamang)',
  `-- Manba: apps/api/prisma/data/  •  ${sections.length} bo\u2018lim`,
  'BEGIN;',
  '',
];

let topicCount = 0;

for (const section of sections) {
  const sectionId = `sec_${section.code}`;

  lines.push(`-- ${section.code}. ${section.titleUz}`);
  lines.push(
    `INSERT INTO "Section" ("id","slug","code","order","titleUz","titleEn","description","icon","color","createdAt","updatedAt")`,
  );
  lines.push(
    `VALUES (${q(sectionId)}, ${q(section.slug)}, ${q(section.code)}, ${section.order}, ` +
      `${q(section.titleUz)}, ${q(section.titleEn)}, ${q(section.description)}, ` +
      `${q(section.icon)}, ${q(section.color)}, NOW(), NOW())`,
  );
  lines.push(
    `ON CONFLICT ("slug") DO UPDATE SET "code"=EXCLUDED."code", "order"=EXCLUDED."order",` +
      ` "titleUz"=EXCLUDED."titleUz", "titleEn"=EXCLUDED."titleEn",` +
      ` "description"=EXCLUDED."description", "icon"=EXCLUDED."icon",` +
      ` "color"=EXCLUDED."color", "updatedAt"=NOW();`,
  );
  lines.push('');

  for (const topic of section.topics) {
    const topicId = `top_${topic.code.replace('.', '_')}`;
    topicCount += 1;

    lines.push(
      `INSERT INTO "Topic" ("id","sectionId","slug","code","order","titleUz","titleEn","summary","theory","formulas","keywords","difficulty","createdAt","updatedAt")`,
    );
    lines.push(
      `VALUES (${q(topicId)}, ${q(sectionId)}, ${q(topic.slug)}, ${q(topic.code)}, ${topic.order}, ` +
        `${q(topic.titleUz)}, ${q(topic.titleEn)}, ${q(topic.summary)}, ${q(topic.theory)}, ` +
        `${jsonLiteral(topic.formulas)}, ${textArray(topic.keywords)}, ` +
        `${q(topic.difficulty)}::"Difficulty", NOW(), NOW())`,
    );
    lines.push(
      `ON CONFLICT ("slug") DO UPDATE SET "sectionId"=EXCLUDED."sectionId", "code"=EXCLUDED."code",` +
        ` "order"=EXCLUDED."order", "titleUz"=EXCLUDED."titleUz", "titleEn"=EXCLUDED."titleEn",` +
        ` "summary"=EXCLUDED."summary", "theory"=EXCLUDED."theory", "formulas"=EXCLUDED."formulas",` +
        ` "keywords"=EXCLUDED."keywords", "difficulty"=EXCLUDED."difficulty", "updatedAt"=NOW();`,
    );

    lines.push(
      `INSERT INTO "Simulation" ("id","topicId","kind","config","version","status","createdAt","updatedAt")`,
    );
    lines.push(
      `VALUES (${q(`sim_${topic.code.replace('.', '_')}`)}, ${q(topicId)}, 'DEFAULT', ` +
        `${jsonLiteral(topic.sim)}, 1, 'PUBLISHED', NOW(), NOW())`,
    );
    // Admin qo'ygan HTML hech qachon qayta yozilmaydi.
    lines.push(
      `ON CONFLICT ("topicId") DO UPDATE SET "config"=EXCLUDED."config", "updatedAt"=NOW()` +
        ` WHERE "Simulation"."kind" = 'DEFAULT';`,
    );
    lines.push('');
  }
}

lines.push('COMMIT;');
lines.push('');

writeFileSync(OUT, lines.join('\n'));
console.error(
  `  ${OUT} yozildi: ${sections.length} bo\u2018lim, ${topicCount} mavzu, ${topicCount} simulyatsiya.`,
);
