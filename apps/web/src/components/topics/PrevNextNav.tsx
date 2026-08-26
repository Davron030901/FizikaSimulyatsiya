import type { TopicNeighbour } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function PrevNextNav({
  previous,
  next,
}: {
  previous: TopicNeighbour | null;
  next: TopicNeighbour | null;
}) {
  return (
    <nav aria-label="Mavzular bo'ylab harakat" className="grid gap-3 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/simulyatsiya/${previous.slug}`}
          className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/50"
        >
          <ArrowLeft
            size={16}
            className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="block text-xs text-muted-foreground">Oldingi · {previous.code}</span>
            <span className="block truncate text-sm font-medium">{previous.titleUz}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/simulyatsiya/${next.slug}`}
          className="group flex items-center justify-end gap-3 rounded-xl border border-border bg-card p-3.5 text-right transition-colors hover:border-primary/50"
        >
          <span className="min-w-0">
            <span className="block text-xs text-muted-foreground">Keyingi · {next.code}</span>
            <span className="block truncate text-sm font-medium">{next.titleUz}</span>
          </span>
          <ArrowRight
            size={16}
            className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </nav>
  );
}
