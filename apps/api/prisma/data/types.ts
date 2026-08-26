export type Difficulty = 'OSON' | 'ORTA' | 'QIYIN';

/** Demo shablon turi - bo'limga qarab tanlanadi (FAZA 3 da HTML generatori shuni o'qiydi). */
export type DemoType = 'motion' | 'wave' | 'orbit' | 'vector' | 'fluid';

export interface FormulaSeed {
  latex: string;
  label: string;
}

export interface ParamSeed {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export interface SimConfigSeed {
  demoType: DemoType;
  accent: string;
  formula: string;
  paramA: ParamSeed;
  paramB: ParamSeed;
}

export interface TopicSeed {
  code: string;
  slug: string;
  order: number;
  titleUz: string;
  titleEn: string;
  summary: string;
  theory: string;
  formulas: FormulaSeed[];
  keywords: string[];
  difficulty: Difficulty;
  sim: SimConfigSeed;
}

export interface SectionSeed {
  code: string;
  slug: string;
  order: number;
  titleUz: string;
  titleEn: string;
  description: string;
  icon: string;
  color: string;
  topics: TopicSeed[];
}
