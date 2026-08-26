import { SectionCard } from '@/components/sections/SectionCard';
import { ApiErrorState } from '@/components/system/ApiErrorState';
import { api } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bo'limlar",
  alternates: { canonical: "/bolimlar" },
  description: "Mexanika bo'yicha barcha bo'limlar: kinematika, dinamika, energiya va boshqalar.",
};

/**
 * The API runs as a separate service that may be asleep during a Vercel build,
 * so this page is rendered per request instead of being prerendered with a
 * frozen error state. Responses are still cached by the fetch-level revalidate.
 */
export const dynamic = 'force-dynamic';

export default async function SectionsPage() {
  try {
    const sections = await api.sections();
    const totalTopics = sections.reduce((sum, section) => sum + section.topicCount, 0);

    return (
      <div className="container-page py-10">
        <h1 className="text-2xl font-bold tracking-tight">Bo&apos;limlar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {sections.length} ta bo&apos;lim, jami {totalTopics} ta mavzu
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <li key={section.slug}>
              <SectionCard section={section} headingLevel={2} />
            </li>
          ))}
        </ul>
      </div>
    );
  } catch {
    return (
      <div className="container-page py-10">
        <ApiErrorState />
      </div>
    );
  }
}
