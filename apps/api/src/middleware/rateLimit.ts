import rateLimit from 'express-rate-limit';

const FIFTEEN_MINUTES = 15 * 60 * 1000;

/** Applied to every public /api route. */
export const publicLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: "So'rovlar soni limitdan oshdi. Biroz kutib qayta urinib ko'ring.",
    },
  },
});

/** Stricter limiter reserved for the admin login endpoint (FAZA 5). */
export const authLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: "Juda ko'p urinish. 15 daqiqadan so'ng qayta urinib ko'ring.",
    },
  },
});
