'use client';

import { embedUrl } from '@/lib/api';
import { useTheme } from '@/lib/useTheme';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  ExternalLink,
  Loader2,
  Maximize2,
  Minimize2,
  RotateCw,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_HEIGHT = 380;
const MAX_HEIGHT = 1400;
const LOAD_TIMEOUT_MS = 45_000;
const COLD_START_HINT_MS = 4000;

type Status = 'loading' | 'ready' | 'error';

export function SimulationFrame({ slug, title }: { slug: string; title: string }) {
  const theme = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const [status, setStatus] = useState<Status>('loading');
  const [height, setHeight] = useState(560);
  const [reloadKey, setReloadKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showColdStartHint, setShowColdStartHint] = useState(false);

  const src = `${embedUrl(slug, theme)}&v=${reloadKey}`;

  const reload = useCallback(() => {
    setStatus('loading');
    setReloadKey((key) => key + 1);
  }, []);

  // The embedded page reports its own height so the iframe never scrolls internally.
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source !== frameRef.current?.contentWindow) return;

      const payload = event.data as { type?: string; height?: number } | null;
      if (payload?.type !== 'sim:height' || typeof payload.height !== 'number') return;

      setHeight(Math.min(Math.max(Math.ceil(payload.height), MIN_HEIGHT), MAX_HEIGHT));
      setStatus('ready');
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (status !== 'loading') return;

    const hintTimer = setTimeout(() => setShowColdStartHint(true), COLD_START_HINT_MS);
    const failTimer = setTimeout(() => setStatus('error'), LOAD_TIMEOUT_MS);

    return () => {
      clearTimeout(hintTimer);
      clearTimeout(failTimer);
      setShowColdStartHint(false);
    };
  }, [status, reloadKey]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await wrapperRef.current?.requestFullscreen();
      }
    } catch {
      // Some mobile browsers block the Fullscreen API; the inline view still works.
    }
  }

  return (
    <section aria-label="Simulyatsiya">
      <div className="mb-2 flex items-center justify-end gap-1.5">
        <IconButton onClick={reload} label="Qayta yuklash">
          <RotateCw size={16} />
        </IconButton>
        <IconButton onClick={toggleFullscreen} label={isFullscreen ? 'Chiqish' : "To'liq ekran"}>
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </IconButton>
        <a
          href={embedUrl(slug, theme)}
          target="_blank"
          rel="noreferrer"
          aria-label="Yangi oynada ochish"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      <div
        ref={wrapperRef}
        className={cn(
          'relative overflow-hidden rounded-2xl border border-border bg-card',
          isFullscreen && 'flex h-screen items-center justify-center rounded-none',
        )}
      >
        {status !== 'error' ? (
          <iframe
            key={reloadKey}
            ref={frameRef}
            src={src}
            title={`${title} — simulyatsiya`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-modals"
            allow="fullscreen; accelerometer; gyroscope"
            onLoad={() => setStatus((current) => (current === 'error' ? current : 'ready'))}
            onError={() => setStatus('error')}
            className={cn(
              'w-full border-0 transition-opacity duration-300',
              status === 'ready' ? 'opacity-100' : 'opacity-0',
            )}
            style={{ height: isFullscreen ? '100%' : height }}
          />
        ) : null}

        {status === 'loading' ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card"
            style={{ minHeight: MIN_HEIGHT }}
          >
            <Loader2 size={22} className="animate-spin text-muted-foreground" aria-hidden="true" />
            <p className="px-6 text-center text-sm text-muted-foreground">
              {showColdStartHint
                ? "Server uyg'onmoqda... bu 30 soniyagacha davom etishi mumkin"
                : 'Simulyatsiya yuklanmoqda...'}
            </p>
          </div>
        ) : null}

        {status === 'error' ? (
          <div
            className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center"
            style={{ minHeight: MIN_HEIGHT }}
          >
            <AlertCircle size={26} className="text-danger" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">Simulyatsiya yuklanmadi</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Internet aloqasini tekshiring yoki qaytadan urinib ko&apos;ring.
              </p>
            </div>
            <button
              type="button"
              onClick={reload}
              className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              <RotateCw size={15} aria-hidden="true" />
              Qayta urinish
            </button>
          </div>
        ) : null}
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground sm:hidden">
        Telefonni yon holatga burib, to&apos;liq ekranda ochish qulayroq.
      </p>
    </section>
  );
}

function IconButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </button>
  );
}
