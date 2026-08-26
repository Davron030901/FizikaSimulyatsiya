import { readFileSync } from 'node:fs';
import { allTopics } from '../apps/api/prisma/data';

/**
 * Structural check of schema.prisma.
 *
 * `prisma validate` needs the engine binaries, which are not always downloadable
 * (offline CI, restricted networks). This parses the schema directly and verifies
 * the things that actually break a first `prisma migrate dev`: unknown types,
 * one-sided relations, indexes over missing fields, and enum values the seed uses
 * but the schema does not declare.
 */

const SCHEMA_PATH = 'apps/api/prisma/schema.prisma';
const SCALARS = new Set([
  'String',
  'Boolean',
  'Int',
  'BigInt',
  'Float',
  'Decimal',
  'DateTime',
  'Json',
  'Bytes',
]);

interface Field {
  name: string;
  type: string;
  optional: boolean;
  list: boolean;
  attributes: string;
}

interface Model {
  name: string;
  fields: Field[];
  blockAttributes: string[];
}

const errors: string[] = [];
const passed: string[] = [];

function check(label: string, ok: boolean, detail = ''): void {
  if (ok) passed.push(label);
  else errors.push(`${label}${detail ? ` — ${detail}` : ''}`);
}

function parseSchema(source: string): { models: Model[]; enums: Map<string, string[]> } {
  // Strip comments but keep the structure intact.
  const clean = source
    .split('\n')
    .map((line) => line.replace(/\/\/.*$/, '').trimEnd())
    .join('\n');

  const models: Model[] = [];
  const enums = new Map<string, string[]>();

  for (const match of clean.matchAll(/model\s+(\w+)\s*\{([\s\S]*?)\n\}/g)) {
    const [, name, body] = match;
    if (!name || !body) continue;

    const fields: Field[] = [];
    const blockAttributes: string[] = [];

    for (const rawLine of body.split('\n')) {
      const line = rawLine.trim();
      if (!line) continue;

      if (line.startsWith('@@')) {
        blockAttributes.push(line);
        continue;
      }

      const fieldMatch = line.match(/^(\w+)\s+(\w+)(\[\])?(\?)?\s*(.*)$/);
      if (!fieldMatch) continue;

      fields.push({
        name: fieldMatch[1] ?? '',
        type: fieldMatch[2] ?? '',
        list: Boolean(fieldMatch[3]),
        optional: Boolean(fieldMatch[4]),
        attributes: fieldMatch[5] ?? '',
      });
    }

    models.push({ name, fields, blockAttributes });
  }

  for (const match of clean.matchAll(/enum\s+(\w+)\s*\{([\s\S]*?)\n\}/g)) {
    const [, name, body] = match;
    if (!name || !body) continue;
    enums.set(
      name,
      body
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('@')),
    );
  }

  return { models, enums };
}

const source = readFileSync(SCHEMA_PATH, 'utf8');
const { models, enums } = parseSchema(source);
const modelNames = new Set(models.map((model) => model.name));

console.log('\n  === PRISMA SXEMASI ===');
console.log(`  Modellar: ${models.map((m) => m.name).join(', ')}`);
console.log(`  Enumlar:  ${[...enums.keys()].join(', ')}\n`);

// --- Bloklar ---
check('datasource bloki bor', /datasource\s+\w+\s*\{/.test(source));
check('generator bloki bor', /generator\s+\w+\s*\{/.test(source));
check('provider = postgresql', /provider\s*=\s*"postgresql"/.test(source));
check('DATABASE_URL env orqali olinadi', /env\("DATABASE_URL"\)/.test(source));

const expectedModels = ['Section', 'Topic', 'Simulation', 'AdminUser'];
for (const name of expectedModels) {
  check(`model ${name} mavjud`, modelNames.has(name));
}

// --- Har bir model ---
for (const model of models) {
  const fieldNames = new Set(model.fields.map((field) => field.name));

  const idField = model.fields.find((field) => field.attributes.includes('@id'));
  check(`${model.name}: @id maydoni bor`, Boolean(idField));
  if (idField) {
    check(
      `${model.name}: @id da @default bor`,
      idField.attributes.includes('@default'),
      idField.attributes,
    );
  }

  const updatedAt = model.fields.find((field) => field.name === 'updatedAt');
  if (updatedAt) {
    check(`${model.name}: updatedAt da @updatedAt bor`, updatedAt.attributes.includes('@updatedAt'));
  }

  for (const field of model.fields) {
    const known = SCALARS.has(field.type) || modelNames.has(field.type) || enums.has(field.type);
    check(`${model.name}.${field.name}: tur aniqlangan (${field.type})`, known);

    // Relation attribute must point at fields that exist on both sides.
    const relation = field.attributes.match(/@relation\(([^)]*)\)/);
    if (relation?.[1]) {
      const body = relation[1];
      const fkMatch = body.match(/fields:\s*\[([^\]]+)\]/);
      const refMatch = body.match(/references:\s*\[([^\]]+)\]/);

      if (fkMatch?.[1]) {
        for (const raw of fkMatch[1].split(',')) {
          const fk = raw.trim();
          check(`${model.name}.${field.name}: FK maydoni "${fk}" mavjud`, fieldNames.has(fk));
        }
      }

      if (refMatch?.[1]) {
        const target = models.find((candidate) => candidate.name === field.type);
        for (const raw of refMatch[1].split(',')) {
          const ref = raw.trim();
          check(
            `${model.name}.${field.name}: ${field.type}.${ref} mavjud`,
            Boolean(target?.fields.some((candidate) => candidate.name === ref)),
          );
        }
      }
    }

    // Every relation needs a field on the other side, otherwise Prisma refuses to generate.
    if (modelNames.has(field.type)) {
      const target = models.find((candidate) => candidate.name === field.type);
      const backRelation = target?.fields.some((candidate) => candidate.type === model.name);
      check(`${model.name}.${field.name}: ${field.type} da qarama-qarshi bog'lanish bor`, Boolean(backRelation));
    }
  }

  // @@unique / @@index must reference declared fields.
  for (const attribute of model.blockAttributes) {
    const list = attribute.match(/@@(?:unique|index|id)\(\[([^\]]+)\]/);
    if (!list?.[1]) continue;
    for (const raw of list[1].split(',')) {
      const name = raw.trim();
      check(`${model.name}: ${attribute.slice(0, 24)}... "${name}" maydoni mavjud`, fieldNames.has(name));
    }
  }
}

// --- Seed ma'lumotlari sxemaga mos keladimi ---
const topicModel = models.find((model) => model.name === 'Topic');
const topicFields = new Set(topicModel?.fields.map((field) => field.name) ?? []);
for (const field of ['slug', 'code', 'order', 'titleUz', 'summary', 'theory', 'formulas', 'keywords', 'difficulty']) {
  check(`seed Topic.${field} sxemada bor`, topicFields.has(field));
}

const simModel = models.find((model) => model.name === 'Simulation');
const simFields = new Set(simModel?.fields.map((field) => field.name) ?? []);
for (const field of ['kind', 'status', 'htmlContent', 'externalUrl', 'config', 'version']) {
  check(`seed Simulation.${field} sxemada bor`, simFields.has(field));
}

const difficulties = new Set(enums.get('Difficulty') ?? []);
const usedDifficulties = new Set(allTopics.map((topic) => topic.difficulty));
for (const value of usedDifficulties) {
  check(`Difficulty."${value}" enumda mavjud`, difficulties.has(value));
}

const simKinds = new Set(enums.get('SimKind') ?? []);
for (const value of ['DEFAULT', 'HTML', 'EXTERNAL']) {
  check(`SimKind."${value}" enumda mavjud`, simKinds.has(value));
}
const simStatuses = new Set(enums.get('SimStatus') ?? []);
for (const value of ['DRAFT', 'PUBLISHED']) {
  check(`SimStatus."${value}" enumda mavjud`, simStatuses.has(value));
}

// keywords must be a list for `{ has: ... }` search to work.
const keywords = topicModel?.fields.find((field) => field.name === 'keywords');
check('Topic.keywords massiv (String[])', Boolean(keywords?.list && keywords.type === 'String'));

const config = simModel?.fields.find((field) => field.name === 'config');
check('Simulation.config Json turida', config?.type === 'Json');

const topicRelation = simModel?.fields.find((field) => field.name === 'topicId');
check('Simulation.topicId @unique (1:1 bog\u2018lanish)', Boolean(topicRelation?.attributes.includes('@unique')));

console.log(`  Muvaffaqiyatli: ${passed.length}`);
console.log(`  Xatolar:        ${errors.length}\n`);

for (const error of errors) console.log(`  XATO ${error}`);
if (errors.length > 0) {
  console.log('');
  process.exit(1);
}

console.log('  Sxema strukturasi toza.\n');
