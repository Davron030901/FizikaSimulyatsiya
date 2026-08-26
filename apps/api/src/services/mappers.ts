import type { Prisma, Section, Simulation, Topic } from '@prisma/client';
import type {
  FormulaDto,
  SectionListDto,
  TopicListDto,
  TopicNeighbourDto,
} from '../types/dto';

type TopicWithRelations = Topic & {
  section: Pick<Section, 'slug' | 'titleUz' | 'color'>;
  simulation: Pick<Simulation, 'kind' | 'status'> | null;
};

/** Prisma stores formulas as Json; this narrows it back to a typed array. */
export function parseFormulas(value: Prisma.JsonValue | null): FormulaDto[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) return [];
    const record = entry as Record<string, unknown>;
    const latex = typeof record.latex === 'string' ? record.latex : null;
    const label = typeof record.label === 'string' ? record.label : '';
    return latex ? [{ latex, label }] : [];
  });
}

export function toTopicListDto(topic: TopicWithRelations): TopicListDto {
  const formulas = parseFormulas(topic.formulas);

  return {
    slug: topic.slug,
    code: topic.code,
    order: topic.order,
    titleUz: topic.titleUz,
    titleEn: topic.titleEn,
    summary: topic.summary,
    difficulty: topic.difficulty,
    formula: formulas[0]?.latex ?? null,
    section: {
      slug: topic.section.slug,
      titleUz: topic.section.titleUz,
      color: topic.section.color,
    },
    simulation: topic.simulation
      ? {
          kind: topic.simulation.kind,
          status: topic.simulation.status,
          isDemo: topic.simulation.kind === 'DEFAULT',
        }
      : null,
  };
}

export function toSectionListDto(
  section: Section & { _count: { topics: number } },
): SectionListDto {
  return {
    slug: section.slug,
    code: section.code,
    order: section.order,
    titleUz: section.titleUz,
    titleEn: section.titleEn,
    description: section.description,
    icon: section.icon,
    color: section.color,
    topicCount: section._count.topics,
  };
}

export function toNeighbourDto(
  topic: Pick<Topic, 'slug' | 'code' | 'titleUz'>,
): TopicNeighbourDto {
  return { slug: topic.slug, code: topic.code, titleUz: topic.titleUz };
}

/** Shared include shape so list and detail queries stay in sync. */
export const topicInclude = {
  section: { select: { slug: true, titleUz: true, color: true } },
  simulation: { select: { kind: true, status: true } },
} satisfies Prisma.TopicInclude;
