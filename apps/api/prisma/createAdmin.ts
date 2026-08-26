import { PrismaClient } from '@prisma/client';
import { createInterface } from 'node:readline/promises';
import { hashPassword } from '../src/services/auth.service';

const prisma = new PrismaClient();

/**
 * Creates or updates the admin account.
 * Reads ADMIN_EMAIL / ADMIN_PASSWORD from the environment, and falls back to an
 * interactive prompt so credentials never have to be written into a file.
 */
async function main(): Promise<void> {
  let email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  let password = process.env.ADMIN_PASSWORD;
  let name = process.env.ADMIN_NAME?.trim() || 'Administrator';

  if (!email || !password) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    email = (email ?? (await rl.question('Email: '))).trim().toLowerCase();
    password = password ?? (await rl.question('Parol (kamida 8 belgi): '));
    const answer = (await rl.question(`Ism [${name}]: `)).trim();
    if (answer) name = answer;
    rl.close();
  }

  if (!email.includes('@')) {
    console.error("\n  Email formati noto'g'ri.\n");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('\n  Parol kamida 8 ta belgidan iborat bo\u2018lishi kerak.\n');
    process.exit(1);
  }

  const hashed = await hashPassword(password);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { password: hashed, name },
    create: { email, password: hashed, name },
  });

  console.log(`\n  Admin tayyor: ${user.email} (${user.name})`);
  console.log('  Kirish: /admin/login\n');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error('\n  Xatolik:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
