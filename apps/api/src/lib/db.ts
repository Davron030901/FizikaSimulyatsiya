import { prisma } from './prisma';

export type DatabaseStatus = 'connected' | 'not_configured' | 'error';

/**
 * Lightweight connectivity probe for the health endpoint.
 * Never throws: a failing database must not take down the health check itself,
 * otherwise Render restarts a service that is only waiting on its database.
 */
export async function getDatabaseStatus(): Promise<DatabaseStatus> {
  if (!process.env.DATABASE_URL) return 'not_configured';

  try {
    await prisma.$queryRaw`SELECT 1`;
    return 'connected';
  } catch (error) {
    console.error('[db] Ulanishni tekshirishda xatolik:', error);
    return 'error';
  }
}

/** Returns row counts used by /api/health and /api/stats. */
export async function getContentStats(): Promise<{
  sections: number;
  topics: number;
  simulations: number;
} | null> {
  try {
    const [sections, topics, simulations] = await Promise.all([
      prisma.section.count(),
      prisma.topic.count(),
      prisma.simulation.count(),
    ]);
    return { sections, topics, simulations };
  } catch {
    return null;
  }
}
