'use client';

import { Markdown } from '@/lib/markdown';
import { cn } from '@/lib/utils';
import type { Formula } from '@/types';
import { useRef, useState, type KeyboardEvent } from 'react';
import { MathJax } from './MathJax';

type Tab = 'theory' | 'formulas' | 'keywords';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'theory', label: 'Nazariya' },
  { id: 'formulas', label: 'Formulalar' },
  { id: 'keywords', label: "Kalit so'zlar" },
];

export function TheoryTabs({
  theory,
  formulas,
  keywords,
  accent,
}: {
  theory: string;
  formulas: Formula[];
  keywords: string[];
  accent: string;
}) {
  const [active, setActive] = useState<Tab>('theory');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  /**
   * Arrow-key navigation is part of the WAI-ARIA tabs pattern: without it a
   * keyboard user has to Tab through every panel to reach the next tab.
   */
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = TABS.length - 1;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = TABS[nextIndex];
    if (!nextTab) return;
    setActive(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="rounded-2xl border border-border bg-card">
      <div role="tablist" aria-label="Mavzu ma'lumotlari" className="flex gap-1 border-b border-border p-1.5">
        {TABS.map((tab, index) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => onKeyDown(event, index)}
              onClick={() => setActive(tab.id)}
              className={cn(
                'min-h-11 flex-1 rounded-xl px-3 text-sm font-medium transition-colors',
                selected ? 'text-white' : 'text-muted-foreground hover:text-foreground',
              )}
              style={selected ? { backgroundColor: accent } : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="p-5">
        {active === 'theory' ? (
          <div role="tabpanel" id="panel-theory" aria-labelledby="tab-theory" tabIndex={0}>
            {/* Keeps the outline valid: the markdown below starts at h3. */}
            <h2 className="sr-only">Nazariya</h2>
            <Markdown content={theory} />
          </div>
        ) : null}

        {active === 'formulas' ? (
          <div role="tabpanel" id="panel-formulas" aria-labelledby="tab-formulas" tabIndex={0}>
            <h2 className="sr-only">Formulalar</h2>
            <ul className="space-y-2.5">
              {formulas.map((formula, index) => (
                <li
                  key={`${formula.latex}-${index}`}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-3.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm text-muted-foreground">{formula.label}</span>
                  <span className="text-base" style={{ color: accent }}>
                    <MathJax latex={formula.latex} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {active === 'keywords' ? (
          <div role="tabpanel" id="panel-keywords" aria-labelledby="tab-keywords" tabIndex={0}>
            <h2 className="sr-only">Kalit so&apos;zlar</h2>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Bu so&apos;zlar bo&apos;yicha qidiruvda shu mavzuni topish mumkin.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
