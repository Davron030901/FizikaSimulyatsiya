import { SimulationFrame } from '@/components/simulation/SimulationFrame';
import { TheoryTabs } from '@/components/theory/TheoryTabs';
import { Badge } from '@/components/ui/Badge';
import { DifficultyBadge } from '@/components/topics/DifficultyBadge';
import { PrevNextNav } from '@/components/topics/PrevNextNav';
import { api, ApiError } from '@/lib/api';
import { hexToRgbChannels } from '@/lib/format';
import { breadcrumbJsonLd, JsonLd, learningResourceJsonLd } from '@/lib/jsonLd';
import { ChevronRight, FlaskConical } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: { topic: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const topic = await api.topic(params.topic);
    return {
      title: `${topic.code} · ${topic.titleUz}`,
      description: topic.summary,
      keywords: topic.keywords,
      alternates: { canonical: `/simulyatsiya/${topic.slug}` },
      openGraph: {
        type: 'article',
        title: topic.titleUz,
        description: topic.summary,
        url: `/simulyatsiya/${topic.slug}`,
      },
      twitter: { card: 'summary_large_image', title: topic.titleUz, description: topic.summary },
    };
  } catch {
    return { title: 'Simulyatsiya' };
  }
}

export default async function TopicPage({ params }: Props) {
  let topic;

  try {
    topic = await api.topic(params.topic);
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) notFound();
    throw error;
  }

  const color = topic.section.color;
  const rgb = hexToRgbChannels(color);

  const structuredData = [
    learningResourceJsonLd({
      name: topic.titleUz,
      description: topic.summary,
      slug: topic.slug,
      sectionName: topic.section.titleUz,
      difficulty: topic.difficulty,
      keywords: topic.keywords,
    }),
    breadcrumbJsonLd([
      { name: 'Bosh sahifa', path: '/' },
      { name: "Bo'limlar", path: '/bolimlar' },
      { name: topic.section.titleUz, path: `/bolimlar/${topic.section.slug}` },
      { name: topic.titleUz, path: `/simulyatsiya/${topic.slug}` },
    ]),
  ];

  return (
    <div className="container-page py-8">
      <JsonLd data={structuredData} />

      <nav aria-label="Yo'l" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/bolimlar" className="transition-colors hover:text-foreground">
          Bo&apos;limlar
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <Link
          href={`/bolimlar/${topic.section.slug}`}
          className="transition-colors hover:text-foreground"
        >
          {topic.section.titleUz}
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="font-mono text-foreground">{topic.code}</span>
      </nav>

      <header className="mt-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-[28px]">
          {topic.titleUz}
        </h1>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          {topic.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge style={{ color, borderColor: `rgb(${rgb} / 0.35)`, backgroundColor: `rgb(${rgb} / 0.1)` }}>
            {topic.section.titleUz}
          </Badge>
          <DifficultyBadge difficulty={topic.difficulty} />
          {topic.simulation?.isDemo ? (
            <Badge>
              <FlaskConical size={11} aria-hidden="true" />
              Demo rejim
            </Badge>
          ) : null}
        </div>
      </header>

      <div className="mt-7">
        <SimulationFrame slug={topic.slug} title={topic.titleUz} />
      </div>

      <div className="mt-8">
        <TheoryTabs
          theory={topic.theory}
          formulas={topic.formulas}
          keywords={topic.keywords}
          accent={color}
        />
      </div>

      <div className="mt-8">
        <PrevNextNav previous={topic.previous} next={topic.next} />
      </div>

      {topic.related.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-base font-semibold">
            {topic.section.titleUz} bo&apos;limidagi boshqa mavzular
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {topic.related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/simulyatsiya/${item.slug}`}
                  className="flex h-full flex-col gap-1 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/50"
                >
                  <span className="font-mono text-xs text-muted-foreground">{item.code}</span>
                  <span className="text-sm font-medium leading-snug">{item.titleUz}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
