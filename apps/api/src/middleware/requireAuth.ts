import type { NextFunction, Request, Response } from 'express';
import { verifyToken, type AdminPayload } from '../services/auth.service';
import { AppError } from '../utils/AppError';

/** Rejects the request unless a valid admin bearer token is present. */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.get('authorization');

  if (!header?.startsWith('Bearer ')) {
    next(AppError.unauthorized('Avtorizatsiya talab qilinadi'));
    return;
  }

  try {
    res.locals.admin = verifyToken(header.slice(7).trim());
    next();
  } catch (error) {
    next(error);
  }
}

export function currentAdmin(res: Response): AdminPayload {
  return res.locals.admin as AdminPayload;
}
