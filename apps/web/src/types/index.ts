export type Difficulty = 'OSON' | 'ORTA' | 'QIYIN';
export type SimKind = 'DEFAULT' | 'HTML' | 'EXTERNAL';
export type SimStatus = 'DRAFT' | 'PUBLISHED';

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: ApiMeta;
}

export interface ApiFailure {
  success: false;
  error: { code: string; message: string; details?: unknown };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface HealthPayload {
  status: 'ok';
  service: string;
  version: string;
  environment: string;
  uptimeSeconds: number;
  database: 'connected' | 'not_configured' | 'error';
  content: { sections: number; topics: number; simulations: number } | null;
  timestamp: string;
}

export interface Formula {
  latex: string;
  label: string;
}

export interface SectionSummary {
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

export interface TopicSummary {
  slug: string;
  code: string;
  order: number;
  titleUz: string;
  titleEn: string | null;
  summary: string;
  difficulty: Difficulty;
  formula: string | null;
  section: { slug: string; titleUz: string; color: string };
  simulation: { kind: SimKind; status: SimStatus; isDemo: boolean } | null;
}

export interface TopicNeighbour {
  slug: string;
  code: string;
  titleUz: string;
}

export interface TopicDetail extends TopicSummary {
  theory: string;
  formulas: Formula[];
  keywords: string[];
  updatedAt: string;
  previous: TopicNeighbour | null;
  next: TopicNeighbour | null;
  related: TopicNeighbour[];
}

export interface SectionDetail extends SectionSummary {
  topics: TopicSummary[];
}

export interface Stats {
  sections: number;
  topics: number;
  simulations: number;
  demoSimulations: number;
  realSimulations: number;
  published: number;
  drafts: number;
  byDifficulty: Record<Difficulty, number>;
}
