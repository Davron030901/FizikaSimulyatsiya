import type { Request, Response } from 'express';
import { sendError } from '../utils/response';

/** Catches any request that did not match a route. */
export function notFound(req: Request, res: Response): void {
  sendError(res, 404, 'NOT_FOUND', `Endpoint topilmadi: ${req.method} ${req.originalUrl}`);
}
