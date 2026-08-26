import { SectionIcon } from '@/components/sections/SectionIcon';
import { TopicFilters } from '@/components/topics/TopicFilters';
import { api, ApiError } from '@/lib/api';
import { hexToRgbChannels, plural } from '@/lib/format';
import { breadcrumbJsonLd, courseJsonLd, JsonLd } from '@/lib/jsonLd';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Props {
  params: { section: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const section = await api.section(params.section);
    return {
      title: section.titleUz,
      description: section.description,
      alternates: { canonical: `/bolimlar/${section.slug}` },
      openGraph: {
        title: section.titleUz,
        description: section.description,
        url: `/bolimlar/${section.slug}`,
      },
    };
  } catch {
    return { title: "Bo'lim" };
  }
}

export default async function SectionPage({ params }: Props) {
  let section;

  try {
    section = await api.section(params.section);
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) notFound();
    throw error;
  }

  const rgb = hexToRgbChannels(section.color);

  const structuredData = [
    courseJsonLd({
      name: section.titleUz,
      description: section.description,
      slug: section.slug,
      topicCount: section.topicCount,
    }),
    breadcrumbJsonLd([
      { name: 'Bosh sahifa', path: '/' },
      { name: "Bo'limlar", path: '/bolimlar' },
      { name: section.titleUz, path: `/bolimlar/${section.slug}` },
    ]),
  ];

  return (
    <div className="container-page py-8">
      <JsonLd data={structuredData} />

      <nav aria-label="Yo'l" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/bolimlar" className="transition-colors hover:text-foreground">
          Bo&apos;limlar
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-foreground">{section.titleUz}</span>
      </nav>

      <header className="mt-5 flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `rgb(${rgb} / 0.14)`, color: section.color }}
        >
          <SectionIcon name={section.icon} size={24} />
        </span>
        <div className="min-w-0">
          <span className="font-mono text-xs text-muted-foreground">
            {section.code}-bo&apos;lim · {plural(section.topicCount, 'mavzu')}
          </span>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight">{section.titleUz}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {section.description}
          </p>
        </div>
      </header>

      <div className="mt-8">
        <TopicFilters topics={section.topics} accent={section.color} />
      </div>
    </div>
  );
}
