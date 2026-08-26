import 'dotenv/config';
import { z } from 'zod';

/**
 * Environment variables are validated once at boot.
 * If something is missing or malformed the process exits with a readable report
 * instead of failing later with a confusing runtime error.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  CORS_EXTRA_ORIGINS: z.string().optional(),
  JWT_SECRET: z.string().min(16).default('dev-only-secret-change-me-please'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  // Used by `npm run create:admin` to bootstrap the first account.
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  // Required from FAZA 2 onwards. Prisma reads it directly, but we validate it here
  // so a missing value fails fast with a readable message instead of a Prisma stack trace.
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL majburiy. apps/api/.env faylini to'ldiring."),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  console.error(`\n[env] Environment variables noto'g'ri sozlangan:\n${issues}\n`);
  process.exit(1);
}

export const env = parsed.data;

export const IS_PRODUCTION = env.NODE_ENV === 'production';
export const API_VERSION = '0.6.0';
export const API_NAME = 'physicslab-api';

/** Origins allowed by CORS. Vercel preview deployments are matched by regex in app.ts. */
export const allowedOrigins: string[] = [
  env.FRONTEND_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  ...(env.CORS_EXTRA_ORIGINS ? env.CORS_EXTRA_ORIGINS.split(',') : []),
]
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter((origin, index, list) => origin.length > 0 && list.indexOf(origin) === index);
