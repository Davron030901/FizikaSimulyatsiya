import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

/**
 * Compares a live database against schema.prisma.
 *
 * `prisma migrate diff` needs the engine binaries; this uses psql and the schema
 * text instead, so the hand-written initial migration can be verified anywhere
 * psql is available.
 *
 * Ishlatish:  DATABASE_URL=postgresql://... npx tsx scripts/check-migration.ts
 */

const SCHEMA_PATH = 'apps/api/prisma/schema.prisma';
const PSQL = process.env.PSQL_BIN ?? 'psql';
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('\n  DATABASE_URL kerak.\n');
  process.exit(1);
}

/** Prisma turi -> PostgreSQL turi (default mapping). */
const TYPE_MAP: Record<string, string> = {
  String: 'text',
  Boolean: 'boolean',
  Int: 'integer',
  BigInt: 'bigint',
  Float: 'double precision',
  Decimal: 'numeric',
  DateTime: 'timestamp without time zone',
  Json: 'jsonb',
  Bytes: 'bytea',
};

interface Field {
  name: string;
  type: string;
  optional: boolean;
  list: boolean;
  attributes: string;
}

function query(sql: string): string[][] {
  const output = execFileSync(PSQL, [DATABASE_URL as string, '-tAF', '\u0001', '-c', sql], {
    encoding: 'utf8',
  });
  return output
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split('\u0001'));
}

// --- schema.prisma ni o'qish ---
const source = readFileSync(SCHEMA_PATH, 'utf8')
  .split('\n')
  .map((line) => line.replace(/\/\/.*$/, '').trimEnd())
  .join('\n');

const models = new Map<string, Field[]>();
const enums = new Map<string, string[]>();

for (const match of source.matchAll(/model\s+(\w+)\s*\{([\s\S]*?)\n\}/g)) {
  const [, name, body] = match;
  if (!name || !body) continue;
  const fields: Field[] = [];

  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('@@')) continue;
    const parsed = line.match(/^(\w+)\s+(\w+)(\[\])?(\?)?\s*(.*)$/);
    if (!parsed) continue;
    fields.push({
      name: parsed[1] ?? '',
      type: parsed[2] ?? '',
      list: Boolean(parsed[3]),
      optional: Boolean(parsed[4]),
      attributes: parsed[5] ?? '',
    });
  }
  models.set(name, fields);
}

for (const match of source.matchAll(/enum\s+(\w+)\s*\{([\s\S]*?)\n\}/g)) {
  const [, name, body] = match;
  if (!name || !body) continue;
  enums.set(
    name,
    body.split('\n').map((line) => line.trim()).filter((line) => line.length > 0),
  );
}

const errors: string[] = [];
let checks = 0;

function check(label: string, ok: boolean, detail = ''): void {
  checks += 1;
  if (!ok) errors.push(`${label}${detail ? ` — ${detail}` : ''}`);
}

// --- Jadvallar va ustunlar ---
const dbColumns = new Map<string, Map<string, { type: string; nullable: boolean; def: string }>>();
for (const [table, column, type, nullable, def] of query(
  `SELECT table_name, column_name, data_type, is_nullable, COALESCE(column_default,'')
   FROM information_schema.columns WHERE table_schema='public' ORDER BY table_name, ordinal_position`,
)) {
  if (!table || !column) continue;
  if (!dbColumns.has(table)) dbColumns.set(table, new Map());
  dbColumns.get(table)?.set(column, {
    type: type ?? '',
    nullable: nullable === 'YES',
    def: def ?? '',
  });
}

console.log('\n  === MIGRATSIYA vs SXEMA ===');
console.log(`  Bazadagi jadvallar: ${[...dbColumns.keys()].join(', ')}\n`);

for (const [modelName, fields] of models) {
  const table = dbColumns.get(modelName);
  check(`jadval "${modelName}" mavjud`, Boolean(table));
  if (!table) continue;

  const scalarFields = fields.filter(
    (field) => TYPE_MAP[field.type] || enums.has(field.type),
  );

  for (const field of scalarFields) {
    const column = table.get(field.name);
    check(`${modelName}.${field.name} ustuni bor`, Boolean(column));
    if (!column) continue;

    const expectedType = field.list
      ? 'ARRAY'
      : enums.has(field.type)
        ? 'USER-DEFINED'
        : (TYPE_MAP[field.type] ?? '');

    check(
      `${modelName}.${field.name} turi (${expectedType})`,
      column.type === expectedType,
      `bazada: ${column.type}`,
    );

    const hasDefault = field.attributes.includes('@default');

    // Prisma skalyar massivlar (String[]) uchun NOT NULL qo'ymaydi: bo'sh massiv
    // klient tomonda ta'minlanadi, ustun esa nullable qoladi.
    if (!field.list) {
      const expectedNullable = field.optional;
      check(
        `${modelName}.${field.name} nullability`,
        column.nullable === expectedNullable,
        `kutilgan ${expectedNullable ? 'NULL' : 'NOT NULL'}, bazada ${column.nullable ? 'NULL' : 'NOT NULL'}`,
      );
    }

    if (hasDefault && !field.attributes.includes('@default(cuid())') && !field.attributes.includes('@default(uuid())')) {
      check(
        `${modelName}.${field.name} default qiymati bor`,
        column.def.length > 0,
        `atribut: ${field.attributes}`,
      );
    }
  }

  // Sxemada yo'q, lekin bazada bor ustunlar
  const schemaNames = new Set(scalarFields.map((field) => field.name));
  for (const column of table.keys()) {
    check(`${modelName}: "${column}" ustuni sxemada bor`, schemaNames.has(column));
  }
}

// --- Enumlar ---
const dbEnums = new Map<string, string[]>();
for (const [name, labels] of query(
  `SELECT t.typname, string_agg(e.enumlabel, ',' ORDER BY e.enumsortorder)
   FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid GROUP BY t.typname`,
)) {
  if (name) dbEnums.set(name, (labels ?? '').split(','));
}

for (const [name, values] of enums) {
  const dbValues = dbEnums.get(name);
  check(`enum "${name}" bazada bor`, Boolean(dbValues));
  if (dbValues) {
    check(
      `enum "${name}" qiymatlari mos`,
      JSON.stringify(dbValues) === JSON.stringify(values),
      `bazada: ${dbValues.join(',')} | sxemada: ${values.join(',')}`,
    );
  }
}

// --- Cheklovlar ---
const constraints = query(
  `SELECT conname, contype FROM pg_constraint c
   JOIN pg_namespace n ON n.oid = c.connamespace WHERE n.nspname='public'`,
);
const names = new Set(constraints.map((row) => row[0]));

for (const expected of [
  'Section_pkey',
  'Topic_pkey',
  'Simulation_pkey',
  'AdminUser_pkey',
  'Topic_sectionId_fkey',
  'Simulation_topicId_fkey',
]) {
  check(`cheklov "${expected}" bor`, names.has(expected));
}

const indexes = new Set(
  query(`SELECT indexname FROM pg_indexes WHERE schemaname='public'`).map((row) => row[0]),
);
for (const expected of [
  'Section_slug_key',
  'Section_code_key',
  'Section_order_key',
  'Topic_slug_key',
  'Topic_code_key',
  'Topic_sectionId_order_key',
  'Simulation_topicId_key',
  'Simulation_kind_status_idx',
  'AdminUser_email_key',
]) {
  check(`indeks "${expected}" bor`, indexes.has(expected));
}

// --- Kaskad o'chirish ---
const cascades = query(
  `SELECT conname, confdeltype FROM pg_constraint WHERE contype='f'`,
);
for (const [name, action] of cascades) {
  check(`${name}: ON DELETE CASCADE`, action === 'c', `confdeltype=${action}`);
}

console.log(`  Tekshiruvlar: ${checks}`);
console.log(`  Xatolar:      ${errors.length}\n`);
for (const error of errors) console.log(`  XATO ${error}`);

if (errors.length > 0) {
  console.log('');
  process.exit(1);
}
console.log('  Migratsiya sxemaga to\u2018liq mos.\n');
