'use client';

import { embedUrl } from '@/lib/api';
import { useTheme } from '@/lib/useTheme';
import { Eye, RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Preview pane. Uploaded HTML is rendered from srcDoc so nothing has to be saved
 * first; the generated demo is loaded from the API with `preview=1`.
 */
export function LivePreview({
  slug,
  mode,
  html,
}: {
  slug: string;
  mode: 'DEFAULT' | 'HTML' | 'EXTERNAL';
  html: string;
}) {
  const theme = useTheme();
  const [previewHtml, setPreviewHtml] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const stale = mode === 'HTML' && previewHtml !== html;

  useEffect(() => {
    if (mode !== 'HTML') setPreviewHtml('');
  }, [mode]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">
          Ko&apos;rinish {stale ? <span className="text-warning">— yangilanmagan</span> : null}
        </span>
        <button
          type="button"
          onClick={() => {
            setPreviewHtml(html);
            setReloadKey((key) => key + 1);
          }}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium transition-colors hover:border-primary"
        >
          {mode === 'HTML' ? <Eye size={13} /> : <RotateCw size={13} />}
          {mode === 'HTML' ? "Ko'rish" : 'Yangilash'}
        </button>
      </div>

      <div className="min-h-[420px] flex-1 overflow-hidden rounded-xl border border-border bg-card">
        {mode === 'HTML' ? (
          previewHtml ? (
            <iframe
              key={reloadKey}
              srcDoc={previewHtml}
              title="Simulyatsiya ko'rinishi"
              sandbox="allow-scripts allow-same-origin allow-popups allow-modals"
              className="h-full min-h-[420px] w-full border-0"
            />
          ) : (
            <div className="flex h-full min-h-[420px] items-center justify-center px-6 text-center text-sm text-muted-foreground">
              Kodni tekshirish uchun &laquo;Ko&apos;rish&raquo; tugmasini bosing
            </div>
          )
        ) : mode === 'EXTERNAL' ? (
          <div className="flex h-full min-h-[420px] items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Tashqi manzil saqlangandan keyin mavzu sahifasida ochiladi
          </div>
        ) : (
          <iframe
            key={`${reloadKey}-${theme}`}
            src={`${embedUrl(slug, theme)}&preview=1&v=${reloadKey}`}
            title="Demo simulyatsiya"
            sandbox="allow-scripts allow-same-origin allow-popups allow-modals"
            className="h-full min-h-[420px] w-full border-0"
          />
        )}
      </div>
    </div>
  );
}
