import { Router } from 'express';
import { validateQuery, validated } from '../middleware/validate';
import { searchQuerySchema, type SearchQuery } from '../schemas/query.schema';
import { searchTopics } from '../services/topic.service';
import { sendOk } from '../utils/response';

const router = Router();

/** GET /api/search?q=&limit= */
router.get('/', validateQuery(searchQuerySchema), async (_req, res, next) => {
  try {
    const { q, limit } = validated<SearchQuery>(res, 'query');
    const results = await searchTopics(q, limit);
    res.set('Cache-Control', 'public, max-age=60');
    sendOk(res, results, { total: results.length, limit });
  } catch (error) {
    next(error);
  }
});

export default router;
