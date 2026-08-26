'use client';

import { apiFetch, API_URL, ApiError } from '@/lib/api';
import { cn, formatUptime } from '@/lib/utils';
import type { HealthPayload } from '@/types';
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type State =
  | { kind: 'loading' }
  | { kind: 'ok'; health: HealthPayload }
  | { kind: 'error'; message: string };

const COLD_START_HINT_MS = 3000;

export function ApiStatus() {
  const [state, setState] = useState<State>({ kind: 'loading' });
  const [showColdStartHint, setShowColdStartHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    setShowColdStartHint(false);
    hintTimer.current = setTimeout(() => setShowColdStartHint(true), COLD_START_HINT_MS);

    try {
      const health = await apiFetch<HealthPayload>('/api/health', { cache: 'no-store' });
      setState({ kind: 'ok', health });
    } catch (error) {
      setState({
        kind: 'error',
        message: error instanceof ApiError ? error.message : "Serverga ulanib bo'lmadi",
      });
    } finally {
      if (hintTimer.current) clearTimeout(hintTimer.current);
      setShowColdStartHint(false);
    }
  }, []);

  useEffect(() => {
    void load();
    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, [load]);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold">Backend holati</h2>
          <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">{API_URL}</p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={state.kind === 'loading'}
          aria-label="Holatni qayta tekshirish"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw size={15} className={cn(state.kind === 'loading' && 'animate-spin')} />
        </button>
      </div>

      <div className="mt-4" aria-live="polite">
        {state.kind === 'loading' ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            <span>
              {showColdStartHint ? "Server uyg'onmoqda... (~30 soniya)" : 'Tekshirilmoqda...'}
            </span>
          </div>
        ) : null}

        {state.kind === 'ok' ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-success">
              <CheckCircle2 size={16} />
              <span>Server ishlayapti</span>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-4">
              <Field label="Versiya" value={state.health.version} />
              <Field label="Uptime" value={formatUptime(state.health.uptimeSeconds)} />
              <Field
                label="Baza"
                value={state.health.database === 'connected' ? 'ulangan' : state.health.database}
              />
              <Field label="Mavzular" value={String(state.health.content?.topics ?? '—')} />
            </dl>
          </div>
        ) : null}

        {state.kind === 'error' ? (
          <div className="flex items-start gap-2 text-sm text-danger">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{state.message}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-mono text-foreground">{value}</dd>
    </div>
  );
}
