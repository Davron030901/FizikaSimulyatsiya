import { Router } from 'express';
import { validateParams, validateQuery, validated } from '../middleware/validate';
import { slugParamSchema, topicListQuerySchema, type TopicListQuery } from '../schemas/query.schema';
import { getTopicBySlug, listTopics } from '../services/topic.service';
import { buildMeta, sendOk } from '../utils/response';

const router = Router();

/** GET /api/topics?section=&q=&difficulty=&page=&limit= */
router.get('/', validateQuery(topicListQuerySchema), async (_req, res, next) => {
  try {
    const query = validated<TopicListQuery>(res, 'query');
    const { items, total } = await listTopics(query);
    res.set('Cache-Control', 'public, max-age=180');
    sendOk(res, items, buildMeta(query.page, query.limit, total));
  } catch (error) {
    next(error);
  }
});

/** GET /api/topics/:slug */
router.get('/:slug', validateParams(slugParamSchema), async (_req, res, next) => {
  try {
    const { slug } = validated<{ slug: string }>(res, 'params');
    const topic = await getTopicBySlug(slug);
    res.set('Cache-Control', 'public, max-age=300');
    sendOk(res, topic);
  } catch (error) {
    next(error);
  }
});

export default router;
