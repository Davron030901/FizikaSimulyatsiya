import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email("Email formati noto'g'ri"),
  password: z.string().min(1, 'Parol kiritilmagan'),
});

/** 2 MB is the contract for a single self-contained simulation file. */
export const MAX_HTML_BYTES = 2 * 1024 * 1024;

/** Only these CDNs may be referenced by an uploaded simulation. */
export const ALLOWED_SCRIPT_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com'];

export const updateSimulationSchema = z
  .object({
    kind: z.enum(['DEFAULT', 'HTML', 'EXTERNAL']),
    status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
    htmlContent: z.string().optional(),
    externalUrl: z.string().url("Manzil noto'g'ri").optional(),
  })
  .superRefine((value, ctx) => {
    if (value.kind === 'HTML') {
      if (!value.htmlContent || value.htmlContent.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['htmlContent'],
          message: 'HTML kod kiritilmagan',
        });
        return;
      }
      const issue = validateSimulationHtml(value.htmlContent);
      if (issue) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['htmlContent'], message: issue });
      }
    }

    if (value.kind === 'EXTERNAL' && !value.externalUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['externalUrl'],
        message: 'Tashqi manzil kiritilmagan',
      });
    }
  });

export type UpdateSimulationInput = z.infer<typeof updateSimulationSchema>;

const SCRIPT_SRC = /<script[^>]*\ssrc\s*=\s*["']([^"']+)["']/gi;

/**
 * Structural and safety checks for an uploaded simulation.
 * Returns an error message, or null when the document is acceptable.
 */
export function validateSimulationHtml(html: string): string | null {
  const bytes = Buffer.byteLength(html, 'utf8');
  if (bytes > MAX_HTML_BYTES) {
    return `Fayl juda katta: ${(bytes / 1024 / 1024).toFixed(1)} MB. Chegara 2 MB.`;
  }

  const lower = html.toLowerCase();
  if (!lower.includes('<html') || !lower.includes('<body')) {
    return "To'liq HTML hujjat kerak: <html> va <body> teglari topilmadi.";
  }
  if (!lower.includes('</html>')) {
    return 'Hujjat </html> bilan yakunlanmagan.';
  }

  SCRIPT_SRC.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = SCRIPT_SRC.exec(html)) !== null) {
    const src = match[1];
    if (!src || src.startsWith('data:')) continue;

    // Relative paths cannot resolve inside the embed, so they are rejected too.
    let host: string;
    try {
      host = new URL(src, 'https://placeholder.invalid').hostname;
    } catch {
      return `Tashqi skript manzili noto'g'ri: ${src}`;
    }

    if (host === 'placeholder.invalid') {
      return `Nisbiy skript manzili ishlamaydi: ${src}. Kodni HTML ichiga joylang.`;
    }
    if (!ALLOWED_SCRIPT_HOSTS.includes(host)) {
      return `Ruxsat etilmagan CDN: ${host}. Faqat ${ALLOWED_SCRIPT_HOSTS.join(', ')} mumkin.`;
    }
  }

  return null;
}
