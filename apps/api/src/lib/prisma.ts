import { PrismaClient } from '@prisma/client';
import { IS_PRODUCTION } from '../config/env';

/**
 * Single shared client. In watch mode the module is re-evaluated on every change,
 * so the instance is cached on globalThis to avoid exhausting the connection pool.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: IS_PRODUCTION ? ['error'] : ['warn', 'error'],
  });

if (!IS_PRODUCTION) {
  globalForPrisma.prisma = prisma;
}

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
