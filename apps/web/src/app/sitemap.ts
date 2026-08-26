import { api } from '@/lib/api';
import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Rendered on request: the API may be unreachable during the build. */
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/bolimlar`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/haqida`, changeFrequency: 'monthly', priority: 0.3 },
  ];

  try {
    const [sections, topics] = await Promise.all([api.sections(), api.topics({ limit: 100 })]);

    return [
      ...staticRoutes,
      ...sections.map((section) => ({
        url: `${SITE_URL}/bolimlar/${section.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
      ...topics.data.map((topic) => ({
        url: `${SITE_URL}/simulyatsiya/${topic.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // A sleeping API must not break the build; static routes are still valid.
    return staticRoutes;
  }
}
