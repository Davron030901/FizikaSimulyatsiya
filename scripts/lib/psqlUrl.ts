/**
 * psql uchun ulanish manzilini tayyorlaydi.
 *
 * Ikki muammoni hal qiladi:
 *
 *  1. Supabase'da `DATABASE_URL` transaction pooler'ga (port 6543) ishora qiladi.
 *     U oddiy so'rovlar uchun ishlaydi, lekin migratsiya va tahlil uchun poolersiz
 *     ulanish afzal — shuning uchun `DIRECT_URL` bo'lsa, o'sha olinadi.
 *
 *  2. Prisma manzilga o'ziga xos parametrlar qo'shadi (`pgbouncer`, `schema`,
 *     `connection_limit`). psql ularni tanimaydi va
 *     "invalid URI query parameter" xatosi bilan to'xtaydi — shuning uchun
 *     ular olib tashlanadi.
 */

/** Faqat Prisma tushunadigan, libpq tanimaydigan parametrlar. */
const PRISMA_ONLY_PARAMS = [
  'pgbouncer',
  'schema',
  'connection_limit',
  'pool_timeout',
  'statement_cache_size',
  'socket_timeout',
];

export function resolvePsqlUrl(): string | null {
  const raw = process.env.DIRECT_URL?.trim() || process.env.DATABASE_URL?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    for (const param of PRISMA_ONLY_PARAMS) {
      url.searchParams.delete(param);
    }
    return url.toString();
  } catch {
    // Manzil URL sifatida tahlil qilinmasa, o'zini qaytaramiz — psql o'zi xato beradi.
    return raw;
  }
}

/** Log va xato xabarlari uchun: paroli yashirilgan manzil. */
export function maskUrl(url: string): string {
  return url.replace(/:\/\/([^:@/]+):[^@]*@/, '://$1:****@');
}
