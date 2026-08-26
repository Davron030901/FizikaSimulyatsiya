import type { Difficulty, SimKind, SimStatus } from '@prisma/client';

export interface FormulaDto {
  latex: string;
  label: string;
}

export interface SectionListDto {
  slug: string;
  code: string;
  order: number;
  titleUz: string;
  titleEn: string | null;
  description: string;
  icon: string;
  color: string;
  topicCount: number;
}

export interface TopicListDto {
  slug: string;
  code: string;
  order: number;
  titleUz: string;
  titleEn: string | null;
  summary: string;
  difficulty: Difficulty;
  formula: string | null;
  section: {
    slug: string;
    titleUz: string;
    color: string;
  };
  simulation: {
    kind: SimKind;
    status: SimStatus;
    isDemo: boolean;
  } | null;
}

export interface TopicNeighbourDto {
  slug: string;
  code: string;
  titleUz: string;
}

export interface TopicDetailDto extends TopicListDto {
  theory: string;
  formulas: FormulaDto[];
  keywords: string[];
  updatedAt: string;
  previous: TopicNeighbourDto | null;
  next: TopicNeighbourDto | null;
  related: TopicNeighbourDto[];
}

export interface SectionDetailDto extends SectionListDto {
  topics: TopicListDto[];
}

export interface SimulationMetaDto {
  topicSlug: string;
  kind: SimKind;
  status: SimStatus;
  isDemo: boolean;
  version: number;
  updatedAt: string;
  embedUrl: string;
  externalUrl: string | null;
}

export interface StatsDto {
  sections: number;
  topics: number;
  simulations: number;
  demoSimulations: number;
  realSimulations: number;
  published: number;
  drafts: number;
  byDifficulty: Record<Difficulty, number>;
}
