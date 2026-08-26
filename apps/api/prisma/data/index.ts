import { kinematika } from './01-kinematika';
import { dinamika } from './02-dinamika';
import { energiya } from './03-energiya';
import { impuls } from './04-impuls';
import { aylanmaHarakat } from './05-aylanma-harakat';
import { tebranish } from './06-tebranish';
import { gravitatsiya } from './07-gravitatsiya';
import { statika } from './08-statika';
import { suyuqlik } from './09-suyuqlik';
import type { SectionSeed, TopicSeed } from './types';

export const sections: SectionSeed[] = [
  kinematika,
  dinamika,
  energiya,
  impuls,
  aylanmaHarakat,
  tebranish,
  gravitatsiya,
  statika,
  suyuqlik,
];

/** Barcha mavzular bitta tekis ro'yxatda (bo'lim slug'i bilan birga). */
export const allTopics: Array<TopicSeed & { sectionSlug: string }> = sections.flatMap((section) =>
  section.topics.map((topic) => ({ ...topic, sectionSlug: section.slug })),
);

export const SECTION_COUNT = sections.length;
export const TOPIC_COUNT = allTopics.length;

export * from './types';
