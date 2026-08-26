import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { allowedOrigins, IS_PRODUCTION } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { publicLimiter } from './middleware/rateLimit';
import routes from './routes';

/** Vercel preview deployments get a generated subdomain, so they are matched by pattern. */
const VERCEL_PREVIEW = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

function isOriginAllowed(origin: string): boolean {
  const normalized = origin.replace(/\/$/, '');
  return allowedOrigins.includes(normalized) || VERCEL_PREVIEW.test(normalized);
}

export function createApp(): Express {
  const app = express();

  // Render terminates TLS in front of the app, so the real client IP comes from the proxy.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(
    helmet({
      // Simulations are served to an <iframe> on another origin (FAZA 3).
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    }),
  );

  app.use(
    cors({
      origin(origin, callback) {
        // Requests without an Origin header (curl, health checks) are always allowed.
        if (!origin || isOriginAllowed(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error(`CORS: ${origin} manziliga ruxsat berilmagan`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  );

  app.use(compression());
  app.use(express.json({ limit: '3mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  app.use(morgan(IS_PRODUCTION ? 'combined' : 'dev'));

  app.get('/', (_req, res) => {
    res.redirect('/api');
  });

  app.use('/api', publicLimiter, routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
