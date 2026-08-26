import { PrismaClient } from '@prisma/client';
import { getAdminCredentials } from '../src/config/env';
import { hashPassword } from '../src/services/auth.service';
import { sections } from './data';

const prisma = new PrismaClient();

/**
 * Seed idempotent: upsert ishlatilgani uchun uni xohlagancha marta qayta ishga tushirish mumkin.
 * Mavjud simulyatsiyalar (kind = HTML yoki EXTERNAL) qayta yozilmaydi - admin kiritgan
 * kod seed tufayli yo'qolmasligi kerak.
 */
async function main(): Promise<void> {
  console.log('\n  Seed boshlandi...\n');

  let sectionCount = 0;
  let topicCount = 0;
  let simCreated = 0;
  let simSkipped = 0;

  for (const sectionSeed of sections) {
    const section = await prisma.section.upsert({
      where: { slug: sectionSeed.slug },
      update: {
        code: sectionSeed.code,
        order: sectionSeed.order,
        titleUz: sectionSeed.titleUz,
        titleEn: sectionSeed.titleEn,
        description: sectionSeed.description,
        icon: sectionSeed.icon,
        color: sectionSeed.color,
      },
      create: {
        slug: sectionSeed.slug,
        code: sectionSeed.code,
        order: sectionSeed.order,
        titleUz: sectionSeed.titleUz,
        titleEn: sectionSeed.titleEn,
        description: sectionSeed.description,
        icon: sectionSeed.icon,
        color: sectionSeed.color,
      },
    });
    sectionCount += 1;

    for (const topicSeed of sectionSeed.topics) {
      const topicData = {
        sectionId: section.id,
        code: topicSeed.code,
        order: topicSeed.order,
        titleUz: topicSeed.titleUz,
        titleEn: topicSeed.titleEn,
        summary: topicSeed.summary,
        theory: topicSeed.theory,
        formulas: topicSeed.formulas,
        keywords: topicSeed.keywords,
        difficulty: topicSeed.difficulty,
      };

      const topic = await prisma.topic.upsert({
        where: { slug: topicSeed.slug },
        update: topicData,
        create: { slug: topicSeed.slug, ...topicData },
      });
      topicCount += 1;

      const existingSim = await prisma.simulation.findUnique({
        where: { topicId: topic.id },
      });

      if (existingSim && existingSim.kind !== 'DEFAULT') {
        // Admin allaqachon haqiqiy simulyatsiya joylagan - unga tegmaymiz.
        simSkipped += 1;
        continue;
      }

      await prisma.simulation.upsert({
        where: { topicId: topic.id },
        update: { kind: 'DEFAULT', config: topicSeed.sim, status: 'PUBLISHED' },
        create: {
          topicId: topic.id,
          kind: 'DEFAULT',
          config: topicSeed.sim,
          status: 'PUBLISHED',
        },
      });
      simCreated += 1;
    }

    console.log(
      `  ${sectionSeed.code}. ${sectionSeed.titleUz.padEnd(28)} ${String(sectionSeed.topics.length).padStart(2)} ta mavzu`,
    );
  }

  await seedAdmin();

  console.log('\n  ---------------------------------------------');
  console.log(`  Bo'limlar:               ${sectionCount}`);
  console.log(`  Mavzular:                ${topicCount}`);
  console.log(`  Demo simulyatsiyalar:    ${simCreated}`);
  if (simSkipped > 0) {
    console.log(`  O'zgartirilmadi (HTML):  ${simSkipped}`);
  }
  console.log('  ---------------------------------------------\n');
}

/**
 * Optional: creates the first admin when credentials are present.
 * Never fails the seed — content matters more than the admin account, which can
 * always be added later with `npm run create:admin`.
 */
async function seedAdmin(): Promise<void> {
  const credentials = getAdminCredentials();

  if ('error' in credentials) {
    console.log(`\n  Admin yaratilmadi: ${credentials.error}`);
    console.log('  Keyinroq qo\u2018shish uchun: npm run create:admin');
    return;
  }

  const { email, password } = credentials;
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`\n  Admin allaqachon mavjud: ${email}`);
    return;
  }

  await prisma.adminUser.create({
    data: { email, password: await hashPassword(password), name: process.env.ADMIN_NAME ?? 'Administrator' },
  });
  console.log(`\n  Admin yaratildi: ${email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('  Seed muvaffaqiyatli yakunlandi.\n');
  })
  .catch(async (error) => {
    console.error('\n  Seed xatosi:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
