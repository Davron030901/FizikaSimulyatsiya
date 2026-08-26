import { prisma } from '../lib/prisma';
import type { UpdateSimulationInput } from '../schemas/admin.schema';
import { AppError } from '../utils/AppError';

export interface AdminTopicRow {
  slug: string;
  code: string;
  titleUz: string;
  sectionSlug: string;
  sectionTitle: string;
  sectionColor: string;
  difficulty: string;
  kind: string;
  status: string;
  version: number;
  hasHtml: boolean;
  updatedAt: string;
}

export async function listTopicsForAdmin(): Promise<AdminTopicRow[]> {
  const topics = await prisma.topic.findMany({
    orderBy: [{ section: { order: 'asc' } }, { order: 'asc' }],
    include: {
      section: { select: { slug: true, titleUz: true, color: true } },
      simulation: {
        select: { kind: true, status: true, version: true, updatedAt: true, htmlContent: true },
      },
    },
  });

  return topics.map((topic) => ({
    slug: topic.slug,
    code: topic.code,
    titleUz: topic.titleUz,
    sectionSlug: topic.section.slug,
    sectionTitle: topic.section.titleUz,
    sectionColor: topic.section.color,
    difficulty: topic.difficulty,
    kind: topic.simulation?.kind ?? 'DEFAULT',
    status: topic.simulation?.status ?? 'PUBLISHED',
    version: topic.simulation?.version ?? 0,
    hasHtml: Boolean(topic.simulation?.htmlContent),
    updatedAt: (topic.simulation?.updatedAt ?? topic.updatedAt).toISOString(),
  }));
}

export async function getSimulationForAdmin(topicSlug: string) {
  const topic = await prisma.topic.findUnique({
    where: { slug: topicSlug },
    include: {
      section: { select: { slug: true, titleUz: true, color: true } },
      simulation: true,
    },
  });

  if (!topic) throw AppError.notFound(`"${topicSlug}" mavzusi topilmadi`);

  return {
    topic: {
      slug: topic.slug,
      code: topic.code,
      titleUz: topic.titleUz,
      summary: topic.summary,
      section: topic.section,
    },
    simulation: topic.simulation
      ? {
          kind: topic.simulation.kind,
          status: topic.simulation.status,
          htmlContent: topic.simulation.htmlContent,
          externalUrl: topic.simulation.externalUrl,
          config: topic.simulation.config,
          version: topic.simulation.version,
          updatedAt: topic.simulation.updatedAt.toISOString(),
        }
      : null,
  };
}

async function requireSimulation(topicSlug: string) {
  const simulation = await prisma.simulation.findFirst({
    where: { topic: { slug: topicSlug } },
  });

  if (!simulation) throw AppError.notFound(`"${topicSlug}" uchun simulyatsiya topilmadi`);
  return simulation;
}

export async function updateSimulation(topicSlug: string, input: UpdateSimulationInput) {
  const existing = await requireSimulation(topicSlug);

  // Version only advances when the delivered content actually changes, so the number
  // stays a meaningful "how many times was this simulation replaced" counter.
  const contentChanged =
    existing.kind !== input.kind ||
    (input.kind === 'HTML' && existing.htmlContent !== input.htmlContent) ||
    (input.kind === 'EXTERNAL' && existing.externalUrl !== input.externalUrl);

  const updated = await prisma.simulation.update({
    where: { id: existing.id },
    data: {
      kind: input.kind,
      status: input.status,
      htmlContent: input.kind === 'HTML' ? (input.htmlContent ?? null) : null,
      externalUrl: input.kind === 'EXTERNAL' ? (input.externalUrl ?? null) : null,
      version: contentChanged ? existing.version + 1 : existing.version,
    },
  });

  return {
    kind: updated.kind,
    status: updated.status,
    version: updated.version,
    updatedAt: updated.updatedAt.toISOString(),
  };
}

/**
 * Returns the topic to its generated demo. The `config` column is left untouched,
 * so the demo comes back exactly as it was seeded.
 */
export async function resetSimulation(topicSlug: string) {
  const existing = await requireSimulation(topicSlug);

  const updated = await prisma.simulation.update({
    where: { id: existing.id },
    data: {
      kind: 'DEFAULT',
      status: 'PUBLISHED',
      htmlContent: null,
      externalUrl: null,
      version: existing.version + 1,
    },
  });

  return {
    kind: updated.kind,
    status: updated.status,
    version: updated.version,
    updatedAt: updated.updatedAt.toISOString(),
  };
}
