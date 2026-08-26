import { Badge } from '@/components/ui/Badge';
import { hexToRgbChannels } from '@/lib/format';
import type { TopicSummary } from '@/types';
import { FlaskConical } from 'lucide-react';
import Link from 'next/link';
import { DifficultyBadge } from './DifficultyBadge';

export function TopicCard({
  topic,
  showSection = false,
  headingLevel = 3,
}: {
  topic: TopicSummary;
  showSection?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const color = topic.section.color;
  const rgb = hexToRgbChannels(color);

  return (
    <Link
      href={`/simulyatsiya/${topic.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-md"
      style={{ ['--tw-shadow-color' as string]: `rgb(${rgb} / 0.2)` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="rounded-lg px-2 py-1 font-mono text-xs font-semibold"
          style={{ backgroundColor: `rgb(${rgb} / 0.14)`, color }}
        >
          {topic.code}
        </span>
        <DifficultyBadge difficulty={topic.difficulty} />
      </div>

      <Heading className="mt-3 text-[15px] font-semibold leading-snug">{topic.titleUz}</Heading>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {topic.summary}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
        {showSection ? (
          <Badge style={{ color, borderColor: `rgb(${rgb} / 0.3)` }}>{topic.section.titleUz}</Badge>
        ) : null}
        {topic.simulation?.isDemo ? (
          <Badge>
            <FlaskConical size={11} aria-hidden="true" />
            demo
          </Badge>
        ) : null}
      </div>
    </Link>
  );
}
