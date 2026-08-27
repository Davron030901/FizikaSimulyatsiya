import { Router } from 'express';
import { API_NAME, API_VERSION } from '../config/env';
import { sendOk } from '../utils/response';
import adminRoute from './admin.route';
import authRoute from './auth.route';
import healthRoute from './health.route';
import searchRoute from './search.route';
import sectionsRoute from './sections.route';
import simulationsRoute from './simulations.route';
import statsRoute from './stats.route';
import topicsRoute from './topics.route';

const router = Router();

/** GET /api - small index so the API is self-describing. */
router.get('/', (_req, res) => {
  sendOk(res, {
    name: API_NAME,
    version: API_VERSION,
    phase: 'FAZA 5 - admin panel',
    endpoints: {
      health: '/api/health',
      sections: '/api/sections',
      sectionBySlug: '/api/sections/:slug',
      topics: '/api/topics?section=&q=&difficulty=&page=&limit=',
      topicBySlug: '/api/topics/:slug',
      simulation: '/api/simulations/:topicSlug',
      simulationEmbed: '/api/simulations/:topicSlug/embed?theme=light|dark',
      search: '/api/search?q=',
      stats: '/api/stats',
    },
    adminEndpoints: {
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me',
      topics: 'GET /api/admin/topics',
      simulation: 'GET /api/admin/simulations/:topicSlug',
      update: 'PUT /api/admin/simulations/:topicSlug',
      reset: 'POST /api/admin/simulations/:topicSlug/reset',
    },
  });
});

router.use('/health', healthRoute);
router.use('/sections', sectionsRoute);
router.use('/topics', topicsRoute);
router.use('/simulations', simulationsRoute);
router.use('/search', searchRoute);
router.use('/stats', statsRoute);
router.use('/auth', authRoute);
router.use('/admin', adminRoute);

export default router;
