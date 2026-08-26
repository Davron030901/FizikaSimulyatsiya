'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Element[]) => Promise<void>;
      startup?: { promise?: Promise<void> };
    };
  }
}

const SCRIPT_ID = 'mathjax-cdn';
const CDN = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';

let loader: Promise<void> | null = null;

/** Loads MathJax once per session and resolves when it is ready to typeset. */
function loadMathJax(): Promise<void> {
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    if (document.getElementById(SCRIPT_ID)) {
      resolve();
      return;
    }

    window.MathJax = {
      ...window.MathJax,
      // Configuration must exist before the script runs.
      ...({
        tex: { inlineMath: [['\\(', '\\)']], displayMath: [['\\[', '\\]']] },
        options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'] },
      } as object),
    };

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = CDN;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('MathJax yuklanmadi'));
    document.head.appendChild(script);
  });

  return loader;
}

/**
 * Renders LaTeX. Falls back to the raw expression in a monospace font when the CDN
 * is unavailable, so a formula is never simply missing.
 */
export function MathJax({ latex, display = false }: { latex: string; display?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    const node = ref.current;
    if (!node) return;

    node.textContent = display ? `\\[${latex}\\]` : `\\(${latex}\\)`;

    loadMathJax()
      .then(() => window.MathJax?.startup?.promise ?? Promise.resolve())
      .then(() => {
        if (cancelled || !ref.current) return;
        return window.MathJax?.typesetPromise?.([ref.current]);
      })
      .catch(() => {
        if (!cancelled && ref.current) ref.current.textContent = latex;
      });

    return () => {
      cancelled = true;
    };
  }, [latex, display]);

  return <span ref={ref} className="font-mono text-[13px]" suppressHydrationWarning />;
}
