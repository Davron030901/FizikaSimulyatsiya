import { prisma } from '../lib/prisma';
import { parseDemoConfig } from '../simulations/demoConfig';
import { renderDemoSimulation } from '../simulations/demoTemplate';
import type { SimulationMetaDto } from '../types/dto';
import { AppError } from '../utils/AppError';

const simulationInclude = {
  topic: {
    select: {
      slug: true,
      code: true,
      titleUz: true,
      section: { select: { titleUz: true, color: true } },
    },
  },
} as const;

async function findByTopicSlug(topicSlug: string) {
  const simulation = await prisma.simulation.findFirst({
    where: { topic: { slug: topicSlug } },
    include: simulationInclude,
  });

  if (!simulation) {
    throw AppError.notFound(`"${topicSlug}" uchun simulyatsiya topilmadi`);
  }

  return simulation;
}

export async function getSimulationMeta(
  topicSlug: string,
  baseUrl: string,
): Promise<SimulationMetaDto> {
  const simulation = await findByTopicSlug(topicSlug);

  return {
    topicSlug,
    kind: simulation.kind,
    status: simulation.status,
    isDemo: simulation.kind === 'DEFAULT',
    version: simulation.version,
    updatedAt: simulation.updatedAt.toISOString(),
    embedUrl: `${baseUrl}/api/simulations/${topicSlug}/embed`,
    externalUrl: simulation.kind === 'EXTERNAL' ? simulation.externalUrl : null,
  };
}

export type EmbedResult =
  | { type: 'html'; body: string; cacheable: boolean }
  | { type: 'redirect'; url: string };

/**
 * Resolves what an <iframe> should receive for a topic.
 *
 * A DRAFT simulation is hidden from visitors and replaced by the demo, so a
 * half-finished upload never reaches the public page. `preview` bypasses that
 * for the admin editor.
 */
export async function getEmbed(
  topicSlug: string,
  theme: 'light' | 'dark',
  preview: boolean,
): Promise<EmbedResult> {
  const simulation = await findByTopicSlug(topicSlug);
  const { topic } = simulation;
  const isVisible = simulation.status === 'PUBLISHED' || preview;

  if (isVisible && simulation.kind === 'EXTERNAL' && simulation.externalUrl) {
    return { type: 'redirect', url: simulation.externalUrl };
  }

  if (isVisible && simulation.kind === 'HTML' && simulation.htmlContent) {
    return { type: 'html', body: simulation.htmlContent, cacheable: !preview };
  }

  const config = parseDemoConfig(simulation.config, topic.section.color);

  return {
    type: 'html',
    cacheable: !preview,
    body: renderDemoSimulation({
      theme,
      config,
      topic: {
        slug: topic.slug,
        code: topic.code,
        titleUz: topic.titleUz,
        sectionTitle: topic.section.titleUz,
      },
    }),
  };
}
