'use client';

import { API_URL, ApiError } from './api';
import type { ApiResponse } from '@/types';

const TOKEN_KEY = 'physicslab-admin-token';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface AdminTopicRow {
  slug: string;
  code: string;
  titleUz: string;
  sectionSlug: string;
  sectionTitle: string;
  sectionColor: string;
  difficulty: string;
  kind: 'DEFAULT' | 'HTML' | 'EXTERNAL';
  status: 'DRAFT' | 'PUBLISHED';
  version: number;
  hasHtml: boolean;
  updatedAt: string;
}

export interface AdminSimulation {
  topic: {
    slug: string;
    code: string;
    titleUz: string;
    summary: string;
    section: { slug: string; titleUz: string; color: string };
  };
  simulation: {
    kind: 'DEFAULT' | 'HTML' | 'EXTERNAL';
    status: 'DRAFT' | 'PUBLISHED';
    htmlContent: string | null;
    externalUrl: string | null;
    config: unknown;
    version: number;
    updatedAt: string;
  } | null;
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* private mode: the session simply will not persist */
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

/** Authenticated request. Throws ApiError('UNAUTHORIZED') when the session expired. */
export async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  if (!token) throw new ApiError('UNAUTHORIZED', 'Sessiya topilmadi', 401);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...init.headers,
      },
    });
  } catch {
    throw new ApiError('NETWORK_ERROR', "Serverga ulanib bo'lmadi");
  }

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    const error = !payload.success ? payload.error : undefined;
    if (response.status === 401) clearToken();
    throw new ApiError(
      error?.code ?? 'HTTP_ERROR',
      error?.message ?? `Xatolik (${response.status})`,
      response.status,
    );
  }

  return payload.data;
}

export async function adminLogin(email: string, password: string): Promise<AdminUser> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const payload = (await response.json()) as ApiResponse<{ token: string; user: AdminUser }>;

  if (!response.ok || !payload.success) {
    const error = !payload.success ? payload.error : undefined;
    throw new ApiError(error?.code ?? 'HTTP_ERROR', error?.message ?? 'Kirish amalga oshmadi');
  }

  setToken(payload.data.token);
  return payload.data.user;
}

export const adminApi = {
  me: () => adminFetch<AdminUser>('/api/auth/me'),
  topics: () => adminFetch<AdminTopicRow[]>('/api/admin/topics'),
  simulation: (slug: string) => adminFetch<AdminSimulation>(`/api/admin/simulations/${slug}`),
  save: (
    slug: string,
    body: {
      kind: 'DEFAULT' | 'HTML' | 'EXTERNAL';
      status: 'DRAFT' | 'PUBLISHED';
      htmlContent?: string;
      externalUrl?: string;
    },
  ) =>
    adminFetch<{ kind: string; status: string; version: number; updatedAt: string }>(
      `/api/admin/simulations/${slug}`,
      { method: 'PUT', body: JSON.stringify(body) },
    ),
  reset: (slug: string) =>
    adminFetch<{ kind: string; version: number }>(`/api/admin/simulations/${slug}/reset`, {
      method: 'POST',
    }),
};
