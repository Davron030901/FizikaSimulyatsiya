import { hexToRgbChannels, plural } from '@/lib/format';
import type { SectionSummary } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionIcon } from './SectionIcon';

/**
 * `headingLevel` keeps the document outline valid: cards sit under an <h2> on the
 * home page (so they are h3), but directly under the <h1> on /bolimlar (so h2).
 */
export function SectionCard({
  section,
  headingLevel = 3,
}: {
  section: SectionSummary;
  headingLevel?: 2 | 3;
}) {
  const rgb = hexToRgbChannels(section.color);
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <Link
      href={`/bolimlar/${section.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderTopColor: section.color, borderTopWidth: 3 }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `rgb(${rgb} / 0.14)`, color: section.color }}
        >
          <SectionIcon name={section.icon} />
        </span>
        <div className="min-w-0">
          <span className="font-mono text-xs text-muted-foreground">{section.code}-bo&apos;lim</span>
          <Heading className="truncate text-base font-semibold">{section.titleUz}</Heading>
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {section.description}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-medium" style={{ color: section.color }}>
          {plural(section.topicCount, 'mavzu')}
        </span>
        <ArrowRight
          size={16}
          className="text-muted-foreground transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
