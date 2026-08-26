export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: ApiMeta;
}

export interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface ContentStats {
  sections: number;
  topics: number;
  simulations: number;
}

export interface HealthPayload {
  status: 'ok';
  service: string;
  version: string;
  environment: string;
  uptimeSeconds: number;
  database: 'connected' | 'not_configured' | 'error';
  content: ContentStats | null;
  timestamp: string;
}
