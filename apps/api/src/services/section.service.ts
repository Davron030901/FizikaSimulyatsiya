import { prisma } from '../lib/prisma';
import type { SectionDetailDto, SectionListDto } from '../types/dto';
import { AppError } from '../utils/AppError';
import { toSectionListDto, toTopicListDto, topicInclude } from './mappers';

export async function listSections(): Promise<SectionListDto[]> {
  const sections = await prisma.section.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { topics: true } } },
  });

  return sections.map(toSectionListDto);
}

export async function getSectionBySlug(slug: string): Promise<SectionDetailDto> {
  const section = await prisma.section.findUnique({
    where: { slug },
    include: {
      _count: { select: { topics: true } },
      topics: { orderBy: { order: 'asc' }, include: topicInclude },
    },
  });

  if (!section) {
    throw AppError.notFound(`"${slug}" bo'limi topilmadi`);
  }

  return {
    ...toSectionListDto(section),
    topics: section.topics.map(toTopicListDto),
  };
}
