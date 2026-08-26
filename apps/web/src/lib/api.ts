import type {
  ApiMeta,
  ApiResponse,
  SectionDetail,
  SectionSummary,
  Stats,
  TopicDetail,
  TopicSummary,
} from '@/types';

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(
  /\/$/,
  '',
);

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  get isNotFound(): boolean {
    return this.status === 404 || this.code === 'NOT_FOUND';
  }
}

interface FetchOptions extends RequestInit {
  /** Render's free tier sleeps, so the first request after idling can take ~30s. */
  timeoutMs?: number;
  /** Seconds before Next.js refetches this resource. */
  revalidate?: number;
}

async function request<T>(
  path: string,
  options: FetchOptions = {},
): Promise<{ data: T; meta?: ApiMeta }> {
  const { timeoutMs = 45_000, revalidate, ...init } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...init.headers },
      ...(revalidate !== undefined ? { next: { revalidate } } : {}),
    });

    const payload = (await response.json()) as ApiResponse<T>;

    if (!response.ok || !payload.success) {
      const error = !payload.success ? payload.error : undefined;
      throw new ApiError(
        error?.code ?? 'HTTP_ERROR',
        error?.message ?? `So'rov muvaffaqiyatsiz (${response.status})`,
        response.status,
      );
    }

    return { data: payload.data, meta: payload.meta };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('TIMEOUT', "Server javob bermadi. Qayta urinib ko'ring.");
    }
    throw new ApiError('NETWORK_ERROR', "Serverga ulanib bo'lmadi. Keyinroq urinib ko'ring.");
  } finally {
    clearTimeout(timer);
  }
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { data } = await request<T>(path, options);
  return data;
}

/**
 * Returns null instead of throwing so a page can render a friendly error block
 * rather than crashing the whole route when the API is asleep.
 */
export async function apiFetchSafe<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  try {
    return await apiFetch<T>(path, options);
  } catch {
    return null;
  }
}

const LIST_REVALIDATE = 300;
const DETAIL_REVALIDATE = 300;

export const api = {
  sections: () => apiFetch<SectionSummary[]>('/api/sections', { revalidate: LIST_REVALIDATE }),

  section: (slug: string) =>
    apiFetch<SectionDetail>(`/api/sections/${slug}`, { revalidate: DETAIL_REVALIDATE }),

  topics: (params: Record<string, string | number | undefined> = {}) => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') query.set(key, String(value));
    }
    const suffix = query.toString() ? `?${query}` : '';
    return request<TopicSummary[]>(`/api/topics${suffix}`, { revalidate: LIST_REVALIDATE });
  },

  topic: (slug: string) =>
    apiFetch<TopicDetail>(`/api/topics/${slug}`, { revalidate: DETAIL_REVALIDATE }),

  search: (term: string) =>
    apiFetch<TopicSummary[]>(`/api/search?q=${encodeURIComponent(term)}`, { revalidate: 60 }),

  stats: () => apiFetch<Stats>('/api/stats', { revalidate: LIST_REVALIDATE }),
};

/** URL the topic page loads inside its <iframe>. */
export function embedUrl(topicSlug: string, theme: 'light' | 'dark'): string {
  return `${API_URL}/api/simulations/${topicSlug}/embed?theme=${theme}`;
}
