import type { Response } from 'express';
import type { ApiMeta, ApiResponse } from '../types';

/** Success envelope used by every endpoint: { success: true, data, meta? } */
export function sendOk<T>(res: Response, data: T, meta?: ApiMeta, statusCode = 200): void {
  const body: ApiResponse<T> = meta ? { success: true, data, meta } : { success: true, data };
  res.status(statusCode).json(body);
}

/** Error envelope used by every endpoint: { success: false, error: { code, message } } */
export function sendError(
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown,
): void {
  res.status(statusCode).json({
    success: false,
    error: details === undefined ? { code, message } : { code, message, details },
  });
}

/** Builds pagination metadata from raw query values. */
export function buildMeta(page: number, limit: number, total: number): ApiMeta {
  return {
    page,
    limit,
    total,
    totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
  };
}
