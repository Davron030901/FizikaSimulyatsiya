import { SearchBar } from '@/components/search/SearchBar';
import { SectionCard } from '@/components/sections/SectionCard';
import { ApiErrorState } from '@/components/system/ApiErrorState';
import { TopicCard } from '@/components/topics/TopicCard';
import { api } from '@/lib/api';
import { JsonLd, websiteJsonLd } from '@/lib/jsonLd';
import type { SectionSummary, Stats, TopicSummary } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  alternates: { canonical: '/' },
};

/**
 * The API runs as a separate service that may be asleep during a Vercel build,
 * so this page is rendered per request instead of being prerendered with a
 * frozen error state. Responses are still cached by the fetch-level revalidate.
 */
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let sections: SectionSummary[] = [];
  let stats: Stats | null = null;
  let highlights: TopicSummary[] = [];
  let failed = false;

  try {
    const [sectionsResult, statsResult, topicsResult] = await Promise.all([
      api.sections(),
      api.stats(),
      api.topics({ difficulty: 'OSON', limit: 3 }),
    ]);
    sections = sectionsResult;
    stats = statsResult;
    highlights = topicsResult.data;
  } catch {
    failed = true;
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <JsonLd data={websiteJsonLd()} />

      <section className="animate-fade-up">
        <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Fizikani <span className="text-primary">ko&apos;rib</span> o&apos;rganing
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Mexanika bo&apos;yicha {stats?.sections ?? 9} ta bo&apos;lim va {stats?.topics ?? 79} ta
          mavzu. Har bir mavzu uchun alohida interaktiv simulyatsiya — parametrlarni
          o&apos;zgartiring va natijani real vaqtda kuzating.
        </p>

        <div className="mt-6 max-w-lg">
          <SearchBar />
        </div>
      </section>

      {failed ? (
        <div className="mt-10">
          <ApiErrorState />
        </div>
      ) : (
        <>
          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Bo&apos;limlar</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Mavzuni tanlash uchun bo&apos;limga o&apos;ting
                </p>
              </div>
              <Link
                href="/bolimlar"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary sm:inline-flex"
              >
                Barchasi
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <li key={section.slug}>
                  <SectionCard section={section} />
                </li>
              ))}
            </ul>
          </section>

          {highlights.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-lg font-semibold">Boshlash uchun oson mavzular</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((topic) => (
                  <li key={topic.slug}>
                    <TopicCard topic={topic} showSection />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
