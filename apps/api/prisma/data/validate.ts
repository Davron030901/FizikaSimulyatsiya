import { DEMO_TYPES } from '../../src/simulations/demoConfig';
import { allTopics, sections } from './index';

/**
 * Seed ma'lumotlarining butunligini tekshiradi.
 * Bazasiz ishlaydi, shuning uchun CI da ham, seed'dan oldin ham chaqirish mumkin.
 */

const EXPECTED_SECTIONS = 13;
const EXPECTED_TOPICS = 123;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Generator qabul qiladigan ro'yxatning o'zi — takrorlanmaydi.
const VALID_DEMO_TYPES: readonly string[] = DEMO_TYPES;
const VALID_DIFFICULTIES = ['OSON', 'ORTA', 'QIYIN'];
const MIN_THEORY_CHARS = 400;

const errors: string[] = [];
const warnings: string[] = [];

function check(condition: boolean, message: string): void {
  if (!condition) errors.push(message);
}

// --- Bo'limlar ---
check(
  sections.length === EXPECTED_SECTIONS,
  `Bo'limlar soni ${sections.length}, kutilgani ${EXPECTED_SECTIONS}`,
);

const sectionSlugs = new Set<string>();
const sectionOrders = new Set<number>();

for (const section of sections) {
  const id = `[${section.code}] ${section.titleUz}`;

  check(SLUG_PATTERN.test(section.slug), `${id}: slug formati noto'g'ri - "${section.slug}"`);
  check(!sectionSlugs.has(section.slug), `${id}: slug takrorlangan - "${section.slug}"`);
  sectionSlugs.add(section.slug);

  check(!sectionOrders.has(section.order), `${id}: order takrorlangan - ${section.order}`);
  sectionOrders.add(section.order);

  check(/^#[0-9A-Fa-f]{6}$/.test(section.color), `${id}: rang hex formatda emas`);
  check(section.description.length > 30, `${id}: tavsif juda qisqa`);
  check(section.icon.length > 0, `${id}: ikonka ko'rsatilmagan`);
  check(section.topics.length > 0, `${id}: mavzular yo'q`);

  const topicOrders = new Set<number>();
  for (const topic of section.topics) {
    check(
      !topicOrders.has(topic.order),
      `${id} / ${topic.code}: order takrorlangan - ${topic.order}`,
    );
    topicOrders.add(topic.order);
    check(
      topic.code.startsWith(`${section.code}.`),
      `${topic.code}: kod bo'lim kodiga mos emas (${section.code})`,
    );
  }
}

// --- Mavzular ---
check(
  allTopics.length === EXPECTED_TOPICS,
  `Mavzular soni ${allTopics.length}, kutilgani ${EXPECTED_TOPICS}`,
);

const topicSlugs = new Set<string>();
const topicCodes = new Set<string>();

for (const topic of allTopics) {
  const id = `[${topic.code}] ${topic.titleUz}`;

  check(SLUG_PATTERN.test(topic.slug), `${id}: slug formati noto'g'ri - "${topic.slug}"`);
  check(!topicSlugs.has(topic.slug), `${id}: slug takrorlangan - "${topic.slug}"`);
  topicSlugs.add(topic.slug);

  check(!topicCodes.has(topic.code), `${id}: kod takrorlangan`);
  topicCodes.add(topic.code);

  check(topic.titleUz.length > 3, `${id}: o'zbekcha sarlavha yo'q`);
  check(topic.titleEn.length > 3, `${id}: inglizcha sarlavha yo'q`);
  check(topic.summary.length > 25, `${id}: qisqa tavsif juda qisqa`);
  check(
    topic.theory.length >= MIN_THEORY_CHARS,
    `${id}: nazariya juda qisqa (${topic.theory.length} belgi, kamida ${MIN_THEORY_CHARS})`,
  );
  check(topic.theory.includes('### Hayotiy misol'), `${id}: hayotiy misol bo'limi yo'q`);
  check(topic.formulas.length >= 3, `${id}: kamida 3 ta formula bo'lishi kerak`);
  check(topic.keywords.length >= 3, `${id}: kamida 3 ta kalit so'z bo'lishi kerak`);
  check(
    VALID_DIFFICULTIES.includes(topic.difficulty),
    `${id}: qiyinlik darajasi noto'g'ri - ${topic.difficulty}`,
  );

  for (const formula of topic.formulas) {
    check(formula.latex.length > 0, `${id}: bo'sh formula`);
    check(formula.label.length > 0, `${id}: formula nomi yo'q`);
  }

  // --- Demo simulyatsiya konfiguratsiyasi ---
  const { sim } = topic;
  check(VALID_DEMO_TYPES.includes(sim.demoType), `${id}: demoType noto'g'ri - ${sim.demoType}`);
  check(/^#[0-9A-Fa-f]{6}$/.test(sim.accent), `${id}: sim rangi hex formatda emas`);
  check(sim.formula.length > 0, `${id}: sim formulasi yo'q`);

  for (const [name, param] of [
    ['paramA', sim.paramA],
    ['paramB', sim.paramB],
  ] as const) {
    check(param.min < param.max, `${id}: ${name} min >= max`);
    check(
      param.value >= param.min && param.value <= param.max,
      `${id}: ${name} boshlang'ich qiymati chegaradan tashqarida`,
    );
    check(param.step > 0, `${id}: ${name} step musbat bo'lishi kerak`);
    check(param.label.length > 0, `${id}: ${name} nomi yo'q`);
  }

  if (topic.theory.length < 700) {
    warnings.push(`${id}: nazariya nisbatan qisqa (${topic.theory.length} belgi)`);
  }
}

// --- Natija ---
const totalTheoryChars = allTopics.reduce((sum, topic) => sum + topic.theory.length, 0);
const byDifficulty = allTopics.reduce<Record<string, number>>((acc, topic) => {
  acc[topic.difficulty] = (acc[topic.difficulty] ?? 0) + 1;
  return acc;
}, {});

console.log('');
console.log("  SEED MA'LUMOTLARI TEKSHIRUVI");
console.log('  ---------------------------------------------');
console.log(`  Bo'limlar:          ${sections.length}`);
console.log(`  Mavzular:           ${allTopics.length}`);
console.log(`  Formulalar:         ${allTopics.reduce((s, t) => s + t.formulas.length, 0)}`);
console.log(`  Nazariya hajmi:     ${Math.round(totalTheoryChars / 1000)}k belgi`);
console.log(
  `  Qiyinlik:           OSON ${byDifficulty.OSON ?? 0} / ORTA ${byDifficulty.ORTA ?? 0} / QIYIN ${byDifficulty.QIYIN ?? 0}`,
);
console.log('  ---------------------------------------------');

for (const section of sections) {
  console.log(
    `  ${section.code}. ${section.titleUz.padEnd(28)} ${String(section.topics.length).padStart(2)} ta mavzu`,
  );
}
console.log('');

if (warnings.length > 0) {
  console.log(`  Ogohlantirishlar (${warnings.length}):`);
  warnings.slice(0, 10).forEach((w) => console.log(`    - ${w}`));
  if (warnings.length > 10) console.log(`    ... va yana ${warnings.length - 10} ta`);
  console.log('');
}

if (errors.length > 0) {
  console.error(`  XATOLAR (${errors.length}):`);
  errors.forEach((e) => console.error(`    x ${e}`));
  console.error('');
  process.exit(1);
}

console.log('  Barcha tekshiruvlar muvaffaqiyatli o\u2018tdi.');
console.log('');
