import { api } from '@/lib/api';
import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Rendered on request: the API may be unreachable during the build. */
export const dynamic = 'force-dynamic';

/** API bitta so'rovda ko'pi bilan 100 ta mavzu qaytaradi, shuning uchun sahifalab olamiz. */
async function fetchAllTopics(): Promise<string[]> {
  const LIMIT = 100;
  const slugs: string[] = [];
  let page = 1;

  for (;;) {
    const { data, meta } = await api.topics({ page, limit: LIMIT });
    slugs.push(...data.map((topic) => topic.slug));

    const totalPages = meta?.totalPages ?? 1;
    if (page >= totalPages || data.length === 0) break;
    page += 1;
  }

  return slugs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/bolimlar`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/haqida`, changeFrequency: 'monthly', priority: 0.3 },
  ];

  try {
    const sections = await api.sections();
    const topics = await fetchAllTopics();

    return [
      ...staticRoutes,
      ...sections.map((section) => ({
        url: `${SITE_URL}/bolimlar/${section.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
      ...topics.map((slug) => ({
        url: `${SITE_URL}/simulyatsiya/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // A sleeping API must not break the build; static routes are still valid.
    return staticRoutes;
  }
}
