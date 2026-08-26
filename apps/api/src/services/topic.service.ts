import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import type { TopicListQuery } from '../schemas/query.schema';
import type { TopicDetailDto, TopicListDto } from '../types/dto';
import { AppError } from '../utils/AppError';
import { parseFormulas, toNeighbourDto, toTopicListDto, topicInclude } from './mappers';

/** Curriculum order: section first, then topic order inside it. */
const CURRICULUM_ORDER: Prisma.TopicOrderByWithRelationInput[] = [
  { section: { order: 'asc' } },
  { order: 'asc' },
];

function buildWhere(query: Pick<TopicListQuery, 'section' | 'q' | 'difficulty'>) {
  const where: Prisma.TopicWhereInput = {};

  if (query.section) where.section = { slug: query.section };
  if (query.difficulty) where.difficulty = query.difficulty;

  if (query.q) {
    where.OR = [
      { titleUz: { contains: query.q, mode: 'insensitive' } },
      { titleEn: { contains: query.q, mode: 'insensitive' } },
      { summary: { contains: query.q, mode: 'insensitive' } },
      { code: { startsWith: query.q } },
      { keywords: { has: query.q.toLowerCase() } },
    ];
  }

  return where;
}

export async function listTopics(
  query: TopicListQuery,
): Promise<{ items: TopicListDto[]; total: number }> {
  const where = buildWhere(query);

  const [items, total] = await Promise.all([
    prisma.topic.findMany({
      where,
      orderBy: CURRICULUM_ORDER,
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      include: topicInclude,
    }),
    prisma.topic.count({ where }),
  ]);

  return { items: items.map(toTopicListDto), total };
}

export async function searchTopics(term: string, limit: number): Promise<TopicListDto[]> {
  const topics = await prisma.topic.findMany({
    where: buildWhere({ q: term }),
    orderBy: CURRICULUM_ORDER,
    take: limit,
    include: topicInclude,
  });

  return topics.map(toTopicListDto);
}

export async function getTopicBySlug(slug: string): Promise<TopicDetailDto> {
  const topic = await prisma.topic.findUnique({
    where: { slug },
    include: topicInclude,
  });

  if (!topic) {
    throw AppError.notFound(`"${slug}" mavzusi topilmadi`);
  }

  // 79 rows is small enough to order in one query; this keeps prev/next correct
  // across section boundaries so the whole curriculum can be walked end to end.
  const [order, related] = await Promise.all([
    prisma.topic.findMany({
      orderBy: CURRICULUM_ORDER,
      select: { slug: true, code: true, titleUz: true },
    }),
    prisma.topic.findMany({
      where: { sectionId: topic.sectionId, NOT: { slug } },
      orderBy: { order: 'asc' },
      take: 3,
      select: { slug: true, code: true, titleUz: true },
    }),
  ]);

  const index = order.findIndex((entry) => entry.slug === slug);
  const previous = index > 0 ? order[index - 1] : undefined;
  const next = index >= 0 && index < order.length - 1 ? order[index + 1] : undefined;

  return {
    ...toTopicListDto(topic),
    theory: topic.theory,
    formulas: parseFormulas(topic.formulas),
    keywords: topic.keywords,
    updatedAt: topic.updatedAt.toISOString(),
    previous: previous ? toNeighbourDto(previous) : null,
    next: next ? toNeighbourDto(next) : null,
    related: related.map(toNeighbourDto),
  };
}
