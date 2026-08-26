import { prisma } from '../lib/prisma';
import type { StatsDto } from '../types/dto';

export async function getStats(): Promise<StatsDto> {
  const [sections, topics, simulations, demo, published, byDifficultyRaw] = await Promise.all([
    prisma.section.count(),
    prisma.topic.count(),
    prisma.simulation.count(),
    prisma.simulation.count({ where: { kind: 'DEFAULT' } }),
    prisma.simulation.count({ where: { status: 'PUBLISHED' } }),
    prisma.topic.groupBy({ by: ['difficulty'], _count: { _all: true } }),
  ]);

  const byDifficulty = { OSON: 0, ORTA: 0, QIYIN: 0 };
  for (const row of byDifficultyRaw) {
    byDifficulty[row.difficulty] = row._count._all;
  }

  return {
    sections,
    topics,
    simulations,
    demoSimulations: demo,
    realSimulations: simulations - demo,
    published,
    drafts: simulations - published,
    byDifficulty,
  };
}
