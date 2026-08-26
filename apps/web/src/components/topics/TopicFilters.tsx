'use client';

import { DIFFICULTY_LABELS } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Difficulty, TopicSummary } from '@/types';
import { useMemo, useState } from 'react';
import { TopicCard } from './TopicCard';

const FILTERS: Array<{ id: Difficulty | 'ALL'; label: string }> = [
  { id: 'ALL', label: 'Barchasi' },
  { id: 'OSON', label: DIFFICULTY_LABELS.OSON },
  { id: 'ORTA', label: DIFFICULTY_LABELS.ORTA },
  { id: 'QIYIN', label: DIFFICULTY_LABELS.QIYIN },
];

/**
 * Filtering happens in the browser: a section holds at most 12 topics, so a round
 * trip to the API for each click would only add latency.
 */
export function TopicFilters({ topics, accent }: { topics: TopicSummary[]; accent: string }) {
  const [active, setActive] = useState<Difficulty | 'ALL'>('ALL');

  const counts = useMemo(() => {
    const result: Record<string, number> = { ALL: topics.length };
    for (const topic of topics) {
      result[topic.difficulty] = (result[topic.difficulty] ?? 0) + 1;
    }
    return result;
  }, [topics]);

  const visible = active === 'ALL' ? topics : topics.filter((t) => t.difficulty === active);

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Qiyinlik bo'yicha filtr">
        {FILTERS.map((filter) => {
          const count = counts[filter.id] ?? 0;
          const selected = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              aria-pressed={selected}
              disabled={count === 0}
              className={cn(
                'min-h-10 rounded-xl border px-3.5 text-sm font-medium transition-colors disabled:opacity-40',
                selected
                  ? 'border-transparent text-white'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
              style={selected ? { backgroundColor: accent } : undefined}
            >
              {filter.label}
              <span className="ml-1.5 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} ta mavzu ko&apos;rsatilmoqda
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((topic) => (
          <li key={topic.slug}>
            <TopicCard topic={topic} headingLevel={2} />
          </li>
        ))}
      </ul>
    </>
  );
}
