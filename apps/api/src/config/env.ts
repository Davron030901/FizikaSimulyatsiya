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
  // Only used by `npm run create:admin` and the seed. Deliberately unvalidated here:
  // a weak placeholder must not stop the server from booting. The scripts that
  // actually consume these values check them and explain what is wrong.
  ADMIN_EMAIL: z.string().optional(),
  ADMIN_PASSWORD: z.string().optional(),
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

/**
 * Admin credentials are optional and only meaningful to the bootstrap scripts.
 * Returns null (with a readable reason) instead of throwing, so a placeholder in
 * .env never blocks `npm run dev`.
 */
export function getAdminCredentials(): { email: string; password: string } | { error: string } {
  const email = env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = env.ADMIN_PASSWORD;

  if (!email || !password) {
    return { error: "ADMIN_EMAIL va ADMIN_PASSWORD .env faylida to'ldirilmagan." };
  }
  if (!email.includes('@') || email.length < 5) {
    return { error: `ADMIN_EMAIL formati noto'g'ri: "${email}"` };
  }
  if (password.length < 8) {
    return { error: 'ADMIN_PASSWORD kamida 8 ta belgidan iborat bo\u2018lishi kerak.' };
  }
  return { email, password };
}

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
