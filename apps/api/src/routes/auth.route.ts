import { Router } from 'express';
import { authLimiter } from '../middleware/rateLimit';
import { currentAdmin, requireAuth } from '../middleware/requireAuth';
import { loginSchema } from '../schemas/admin.schema';
import { getAdminById, login } from '../services/auth.service';
import { sendOk } from '../utils/response';

const router = Router();

/** POST /api/auth/login */
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const credentials = loginSchema.parse(req.body);
    const result = await login(credentials.email, credentials.password);
    res.set('Cache-Control', 'no-store');
    sendOk(res, result);
  } catch (error) {
    next(error);
  }
});

/** GET /api/auth/me */
router.get('/me', requireAuth, async (_req, res, next) => {
  try {
    const admin = currentAdmin(res);
    const user = await getAdminById(admin.sub);
    res.set('Cache-Control', 'no-store');
    sendOk(res, user);
  } catch (error) {
    next(error);
  }
});

export default router;
