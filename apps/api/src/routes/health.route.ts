import { Router } from 'express';
import { API_NAME, API_VERSION, env } from '../config/env';
import { getContentStats, getDatabaseStatus } from '../lib/db';
import type { HealthPayload } from '../types';
import { sendOk } from '../utils/response';

const router = Router();

/**
 * GET /api/health
 * Used by Render's health check and by the frontend to detect cold starts.
 * Always answers 200 while the process is alive; database problems are reported
 * in the payload rather than as an HTTP error.
 */
router.get('/', async (_req, res, next) => {
  try {
    const database = await getDatabaseStatus();
    const content = database === 'connected' ? await getContentStats() : null;

    const payload: HealthPayload = {
      status: 'ok',
      service: API_NAME,
      version: API_VERSION,
      environment: env.NODE_ENV,
      uptimeSeconds: Math.round(process.uptime()),
      database,
      content,
      timestamp: new Date().toISOString(),
    };

    res.set('Cache-Control', 'no-store');
    sendOk(res, payload);
  } catch (error) {
    next(error);
  }
});

export default router;
