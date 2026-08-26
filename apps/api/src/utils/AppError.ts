export type ErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'PAYLOAD_TOO_LARGE'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

/** Application level error carrying an HTTP status and a stable machine-readable code. */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  constructor(statusCode: number, code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, AppError);
  }

  static badRequest(message = "So'rov noto'g'ri", details?: unknown) {
    return new AppError(400, 'BAD_REQUEST', message, details);
  }

  static unauthorized(message = 'Avtorizatsiya talab qilinadi') {
    return new AppError(401, 'UNAUTHORIZED', message);
  }

  static forbidden(message = "Ruxsat yo'q") {
    return new AppError(403, 'FORBIDDEN', message);
  }

  static notFound(message = 'Topilmadi') {
    return new AppError(404, 'NOT_FOUND', message);
  }

  static payloadTooLarge(message = 'Fayl hajmi juda katta') {
    return new AppError(413, 'PAYLOAD_TOO_LARGE', message);
  }

  static internal(message = 'Serverda kutilmagan xatolik') {
    return new AppError(500, 'INTERNAL_ERROR', message);
  }
}
