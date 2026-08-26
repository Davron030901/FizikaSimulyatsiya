import { mkdirSync, writeFileSync } from 'node:fs';
import { allTopics, sections } from '../apps/api/prisma/data';
import { parseDemoConfig } from '../apps/api/src/simulations/demoConfig';
import { renderDemoSimulation } from '../apps/api/src/simulations/demoTemplate';

/**
 * Renders every generated demo page and checks its structure.
 * Bazaga ulanish talab qilmaydi.
 */

const OUT_DIR = process.env.DEMO_OUT_DIR ?? '/tmp/physicslab-demos';
mkdirSync(OUT_DIR, { recursive: true });

const colorBySection = new Map(sections.map((section) => [section.slug, section.color]));
const byType: Record<string, number> = {};
const problems: string[] = [];
let totalBytes = 0;

for (const topic of allTopics) {
  const config = parseDemoConfig(topic.sim, colorBySection.get(topic.sectionSlug) ?? '#3B82F6');
  const html = renderDemoSimulation({
    config,
    theme: 'light',
    topic: {
      slug: topic.slug,
      code: topic.code,
      titleUz: topic.titleUz,
      sectionTitle: topic.sectionSlug,
    },
  });

  const id = `[${topic.code}] ${topic.slug}`;
  byType[config.demoType] = (byType[config.demoType] ?? 0) + 1;
  totalBytes += html.length;

  if (!html.startsWith('<!DOCTYPE html>')) problems.push(`${id}: doctype yo'q`);
  if (!html.trimEnd().endsWith('</html>')) problems.push(`${id}: </html> bilan tugamaydi`);
  if (!html.includes('<canvas id="stage"')) problems.push(`${id}: canvas yo'q`);
  if (!html.includes('id="paramARange"') || !html.includes('id="paramBRange"')) {
    problems.push(`${id}: sliderlar to'liq emas`);
  }
  if (!html.includes('id="paramANumber"') || !html.includes('id="paramBNumber"')) {
    problems.push(`${id}: raqamli inputlar yo'q`);
  }
  if ((html.match(/<button type="button" data-preset=/g) ?? []).length !== 6) {
    problems.push(`${id}: preset tugmalari 6 ta emas`);
  }
  if (!html.includes('id="playBtn"') || !html.includes('id="resetBtn"')) {
    problems.push(`${id}: play/reset tugmalari yo'q`);
  }
  if (!html.includes('id="speedSelect"')) problems.push(`${id}: tezlik boshqaruvi yo'q`);
  if (!html.includes("type: 'sim:height'")) problems.push(`${id}: postMessage yo'q`);
  if (!html.includes('window.__SIM_CONFIG__')) problems.push(`${id}: config joylashmagan`);
  if (!html.includes('Demo rejim')) problems.push(`${id}: demo ogohlantirishi yo'q`);
  if (!html.includes(config.accent)) problems.push(`${id}: accent rang qo'llanmagan`);
  if (!html.includes('cdn.jsdelivr.net/npm/mathjax')) problems.push(`${id}: MathJax ulanmagan`);

  for (const tag of ['html', 'head', 'body', 'main', 'style', 'script']) {
    const open = (html.match(new RegExp(`<${tag}[\\s>]`, 'g')) ?? []).length;
    const close = (html.match(new RegExp(`</${tag}>`, 'g')) ?? []).length;
    if (open !== close) problems.push(`${id}: <${tag}> balansi buzilgan (${open}/${close})`);
  }

  for (const body of html.split('<script').slice(1).map((chunk) => chunk.split('</script>')[0] ?? '')) {
    if (body.includes('</script')) problems.push(`${id}: script ichida </script> uchradi`);
  }

  for (const param of [config.paramA, config.paramB]) {
    if (param.min >= param.max) problems.push(`${id}: ${param.key} min >= max`);
    if (param.value < param.min || param.value > param.max) {
      problems.push(`${id}: ${param.key} qiymati chegaradan tashqarida`);
    }
    if (param.step <= 0) problems.push(`${id}: ${param.key} step musbat emas`);
  }

  writeFileSync(`${OUT_DIR}/${topic.code.replace('.', '-')}-${topic.slug}.html`, html);
}

console.log('\n  === DEMO SAHIFALARI ===');
console.log(`  Generatsiya:    ${allTopics.length} ta sahifa`);
console.log(`  O'rtacha hajm:  ${Math.round(totalBytes / allTopics.length / 1024)} KB`);
console.log(`  Fayllar:        ${OUT_DIR}`);
for (const [type, count] of Object.entries(byType).sort()) {
  console.log(`  demoType "${type}"${' '.repeat(Math.max(0, 9 - type.length))} ${count} ta`);
}
console.log('');

if (problems.length > 0) {
  console.log(`  XATOLAR (${problems.length}):`);
  problems.slice(0, 20).forEach((problem) => console.log(`    x ${problem}`));
  process.exit(1);
}

console.log(`  Barcha ${allTopics.length} ta sahifa tekshiruvdan o\u2018tdi.\n`);
