import { Router } from 'express';
import { validateParams, validated } from '../middleware/validate';
import { slugParamSchema } from '../schemas/query.schema';
import { getSectionBySlug, listSections } from '../services/section.service';
import { sendOk } from '../utils/response';

const router = Router();

/** GET /api/sections */
router.get('/', async (_req, res, next) => {
  try {
    const sections = await listSections();
    res.set('Cache-Control', 'public, max-age=300');
    sendOk(res, sections, { total: sections.length });
  } catch (error) {
    next(error);
  }
});

/** GET /api/sections/:slug */
router.get('/:slug', validateParams(slugParamSchema), async (_req, res, next) => {
  try {
    const { slug } = validated<{ slug: string }>(res, 'params');
    const section = await getSectionBySlug(slug);
    res.set('Cache-Control', 'public, max-age=300');
    sendOk(res, section, { total: section.topics.length });
  } catch (error) {
    next(error);
  }
});

export default router;
