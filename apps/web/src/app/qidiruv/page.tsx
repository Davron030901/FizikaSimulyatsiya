import { SearchBar } from '@/components/search/SearchBar';
import { ApiErrorState } from '@/components/system/ApiErrorState';
import { TopicCard } from '@/components/topics/TopicCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { api } from '@/lib/api';
import type { TopicSummary } from '@/types';
import { SearchX, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qidiruv',
  alternates: { canonical: '/qidiruv' },
  description: 'Mavzular, formulalar va kalit so\u2018zlar bo\u2018yicha qidiruv.',
};

interface Props {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const term = (searchParams.q ?? '').trim();
  let results: TopicSummary[] = [];
  let failed = false;

  if (term.length >= 2) {
    try {
      results = await api.search(term);
    } catch {
      failed = true;
    }
  }

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold tracking-tight">Qidiruv</h1>
      <div className="mt-5 max-w-lg">
        <SearchBar initialValue={term} autoFocus />
      </div>

      <div className="mt-8">
        {term.length < 2 ? (
          <EmptyState
            icon={<Sparkles size={26} />}
            title="Nimani qidiryapsiz?"
            description="Mavzu nomi, kodi (masalan 9.2) yoki kalit so'z bo'yicha qidiring. Kamida 2 ta belgi kiriting."
          />
        ) : failed ? (
          <ApiErrorState />
        ) : results.length === 0 ? (
          <EmptyState
            icon={<SearchX size={26} />}
            title="Hech narsa topilmadi"
            description={`"${term}" bo'yicha mavzu topilmadi. Boshqa so'z bilan urinib ko'ring.`}
          />
        ) : (
          <>
            <p className="mb-5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{results.length} ta</span> natija
              topildi
            </p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((topic) => (
                <li key={topic.slug}>
                  <TopicCard topic={topic} showSection headingLevel={2} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
