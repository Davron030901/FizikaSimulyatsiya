import { z } from 'zod';

export const difficultyEnum = z.enum(['OSON', 'ORTA', 'QIYIN']);

export const topicListQuerySchema = z.object({
  section: z.string().trim().min(1).max(80).optional(),
  q: z.string().trim().min(1).max(120).optional(),
  difficulty: difficultyEnum.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const searchQuerySchema = z.object({
  q: z.string().trim().min(2, "Qidiruv so'rovi kamida 2 ta belgidan iborat bo'lishi kerak").max(120),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const embedQuerySchema = z.object({
  theme: z.enum(['light', 'dark']).default('light'),
  lang: z.enum(['uz']).default('uz'),
  preview: z.coerce.boolean().default(false),
});

export const slugParamSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug formati noto'g'ri"),
});

export const topicSlugParamSchema = z.object({
  topicSlug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug formati noto'g'ri"),
});

export type TopicListQuery = z.infer<typeof topicListQuerySchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type EmbedQuery = z.infer<typeof embedQuerySchema>;
