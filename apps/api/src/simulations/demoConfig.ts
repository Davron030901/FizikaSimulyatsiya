import { z } from 'zod';

export const DEMO_TYPES = [
  'motion',
  'wave',
  'orbit',
  'vector',
  'fluid',
  'particles',
  'field',
  'ray',
] as const;
export type DemoType = (typeof DEMO_TYPES)[number];

const paramSchema = z.object({
  key: z.string().default('param'),
  label: z.string().default('Parametr'),
  unit: z.string().default(''),
  min: z.number(),
  max: z.number(),
  step: z.number().positive().default(1),
  value: z.number(),
});

export const demoConfigSchema = z.object({
  demoType: z.enum(DEMO_TYPES).default('motion'),
  accent: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .default('#3B82F6'),
  formula: z.string().default(''),
  paramA: paramSchema,
  paramB: paramSchema,
});

export type DemoParam = z.infer<typeof paramSchema>;
export type DemoConfig = z.infer<typeof demoConfigSchema>;

const FALLBACK_PARAM: DemoParam = {
  key: 'a',
  label: 'Parametr A',
  unit: '',
  min: 0,
  max: 100,
  step: 1,
  value: 50,
};

/** Config is user-editable JSON, so a malformed value must degrade instead of crashing. */
export function parseDemoConfig(raw: unknown, accentFallback: string): DemoConfig {
  const result = demoConfigSchema.safeParse(raw);

  if (result.success) {
    return clampConfig(result.data);
  }

  return clampConfig({
    demoType: 'motion',
    accent: /^#[0-9A-Fa-f]{6}$/.test(accentFallback) ? accentFallback : '#3B82F6',
    formula: '',
    paramA: { ...FALLBACK_PARAM, key: 'a', label: 'Parametr A' },
    paramB: { ...FALLBACK_PARAM, key: 'b', label: 'Parametr B' },
  });
}

/** Guarantees min < max and that the starting value sits inside the range. */
function clampConfig(config: DemoConfig): DemoConfig {
  return {
    ...config,
    paramA: clampParam(config.paramA),
    paramB: clampParam(config.paramB),
  };
}

function clampParam(param: DemoParam): DemoParam {
  const min = Math.min(param.min, param.max);
  const max = param.min === param.max ? param.min + 1 : Math.max(param.min, param.max);
  return {
    ...param,
    min,
    max,
    step: param.step > 0 ? param.step : (max - min) / 100,
    value: Math.min(Math.max(param.value, min), max),
  };
}
