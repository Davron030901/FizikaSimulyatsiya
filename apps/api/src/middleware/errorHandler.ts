import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { IS_PRODUCTION } from '../config/env';
import { AppError } from '../utils/AppError';
import { sendError } from '../utils/response';

/**
 * Central error handler. Must be registered last, after all routes.
 * Express recognises it as an error handler because it takes four arguments.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.code, err.message, err.details);
    return;
  }

  if (err instanceof ZodError) {
    const details = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    sendError(res, 400, 'BAD_REQUEST', "Kiritilgan ma'lumotlar noto'g'ri", details);
    return;
  }

  // express.json() rejects malformed or oversized bodies with these shapes.
  if (typeof err === 'object' && err !== null && 'type' in err) {
    const bodyError = err as { type?: string; status?: number };
    if (bodyError.type === 'entity.too.large') {
      sendError(res, 413, 'PAYLOAD_TOO_LARGE', 'Yuborilgan hajm limitdan katta');
      return;
    }
    if (bodyError.type === 'entity.parse.failed') {
      sendError(res, 400, 'BAD_REQUEST', "JSON formati noto'g'ri");
      return;
    }
  }

  const message = err instanceof Error ? err.message : String(err);
  console.error('[error]', err);

  sendError(
    res,
    500,
    'INTERNAL_ERROR',
    IS_PRODUCTION ? 'Serverda kutilmagan xatolik yuz berdi' : message,
  );
}
