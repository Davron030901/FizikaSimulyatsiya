import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

/**
 * Parsed values are attached to res.locals instead of mutating req.query,
 * which is a getter-only property in Express 5 and read-only in strict TS.
 */
export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      next(result.error);
      return;
    }
    res.locals.query = result.data;
    next();
  };
}

export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      next(result.error);
      return;
    }
    res.locals.params = result.data;
    next();
  };
}

/** Type-safe accessor for values produced by the validators above. */
export function validated<T>(res: Response, key: 'query' | 'params'): T {
  return res.locals[key] as T;
}
