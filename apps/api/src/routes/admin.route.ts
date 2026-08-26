import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { validateParams, validated } from '../middleware/validate';
import { updateSimulationSchema } from '../schemas/admin.schema';
import { topicSlugParamSchema } from '../schemas/query.schema';
import {
  getSimulationForAdmin,
  listTopicsForAdmin,
  resetSimulation,
  updateSimulation,
} from '../services/admin.service';
import { getStats } from '../services/stats.service';
import { sendOk } from '../utils/response';

const router = Router();

// Everything below requires a valid admin token.
router.use(requireAuth);
router.use((_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

/** GET /api/admin/topics — dashboard jadvali */
router.get('/topics', async (_req, res, next) => {
  try {
    const rows = await listTopicsForAdmin();
    sendOk(res, rows, { total: rows.length });
  } catch (error) {
    next(error);
  }
});

/** GET /api/admin/stats */
router.get('/stats', async (_req, res, next) => {
  try {
    sendOk(res, await getStats());
  } catch (error) {
    next(error);
  }
});

/** GET /api/admin/simulations/:topicSlug — htmlContent bilan birga */
router.get(
  '/simulations/:topicSlug',
  validateParams(topicSlugParamSchema),
  async (_req, res, next) => {
    try {
      const { topicSlug } = validated<{ topicSlug: string }>(res, 'params');
      sendOk(res, await getSimulationForAdmin(topicSlug));
    } catch (error) {
      next(error);
    }
  },
);

/** PUT /api/admin/simulations/:topicSlug */
router.put(
  '/simulations/:topicSlug',
  validateParams(topicSlugParamSchema),
  async (req, res, next) => {
    try {
      const { topicSlug } = validated<{ topicSlug: string }>(res, 'params');
      const input = updateSimulationSchema.parse(req.body);
      sendOk(res, await updateSimulation(topicSlug, input));
    } catch (error) {
      next(error);
    }
  },
);

/** POST /api/admin/simulations/:topicSlug/reset — demo holatiga qaytarish */
router.post(
  '/simulations/:topicSlug/reset',
  validateParams(topicSlugParamSchema),
  async (_req, res, next) => {
    try {
      const { topicSlug } = validated<{ topicSlug: string }>(res, 'params');
      sendOk(res, await resetSimulation(topicSlug));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
