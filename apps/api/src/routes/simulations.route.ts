import type { Request } from 'express';
import { Router } from 'express';
import { validateParams, validateQuery, validated } from '../middleware/validate';
import {
  embedQuerySchema,
  topicSlugParamSchema,
  type EmbedQuery,
} from '../schemas/query.schema';
import { getEmbed, getSimulationMeta } from '../services/simulation.service';
import { renderEmbedError } from '../simulations/errorPage';
import { AppError } from '../utils/AppError';
import { sendOk } from '../utils/response';

const router = Router();

/**
 * Allows scripts and inline styles (simulations are self-contained pages) but keeps
 * the network locked down to the two CDNs the HTML contract permits.
 */
const EMBED_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
  "font-src 'self' data: https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
  "img-src 'self' data: blob:",
  "connect-src 'none'",
  "frame-ancestors *",
].join('; ');

function absoluteBaseUrl(req: Request): string {
  const proto = req.get('x-forwarded-proto') ?? req.protocol;
  return `${proto}://${req.get('host')}`;
}

/** GET /api/simulations/:topicSlug */
router.get('/:topicSlug', validateParams(topicSlugParamSchema), async (req, res, next) => {
  try {
    const { topicSlug } = validated<{ topicSlug: string }>(res, 'params');
    const meta = await getSimulationMeta(topicSlug, absoluteBaseUrl(req));
    res.set('Cache-Control', 'public, max-age=120');
    sendOk(res, meta);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/simulations/:topicSlug/embed
 * Returns raw HTML for the <iframe> on the topic page.
 */
router.get(
  '/:topicSlug/embed',
  validateParams(topicSlugParamSchema),
  validateQuery(embedQuerySchema),
  async (_req, res) => {
    const { theme, preview } = validated<EmbedQuery>(res, 'query');

    // X-Frame-Options would block the iframe; helmet sets it globally.
    res.removeHeader('X-Frame-Options');
    res.set('Content-Security-Policy', EMBED_CSP);
    res.set('Content-Type', 'text/html; charset=utf-8');

    try {
      const params = res.locals.params as { topicSlug: string } | undefined;
      if (!params) {
        res.status(400).send(renderEmbedError("Mavzu manzili noto'g'ri", theme));
        return;
      }

      const result = await getEmbed(params.topicSlug, theme, preview);

      if (result.type === 'redirect') {
        res.redirect(302, result.url);
        return;
      }

      res.set(
        'Cache-Control',
        result.cacheable ? 'public, max-age=300' : 'no-store, must-revalidate',
      );
      res.status(200).send(result.body);
    } catch (error) {
      // Never leak a JSON envelope or a stack trace into the iframe.
      const status = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : 'Serverda kutilmagan xatolik yuz berdi. Keyinroq qayta urinib ko\u2018ring.';

      if (status >= 500) console.error('[embed]', error);
      res.status(status).send(renderEmbedError(message, theme));
    }
  },
);

export default router;
