import { Router } from 'express';
import { getStats } from '../services/stats.service';
import { sendOk } from '../utils/response';

const router = Router();

/** GET /api/stats */
router.get('/', async (_req, res, next) => {
  try {
    const stats = await getStats();
    res.set('Cache-Control', 'public, max-age=300');
    sendOk(res, stats);
  } catch (error) {
    next(error);
  }
});

export default router;
