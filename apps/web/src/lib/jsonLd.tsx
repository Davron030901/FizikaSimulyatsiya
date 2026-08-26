const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

interface Crumb {
  name: string;
  path: string;
}

/** Breadcrumb trail so search results show the section a topic belongs to. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PhysicsLab UZ',
    url: SITE_URL,
    inLanguage: 'uz',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/qidiruv?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function courseJsonLd(params: {
  name: string;
  description: string;
  slug: string;
  topicCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: params.name,
    description: params.description,
    url: `${SITE_URL}/bolimlar/${params.slug}`,
    inLanguage: 'uz',
    provider: { '@type': 'Organization', name: 'PhysicsLab UZ', url: SITE_URL },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${params.topicCount}H`,
    },
  };
}

export function learningResourceJsonLd(params: {
  name: string;
  description: string;
  slug: string;
  sectionName: string;
  difficulty: string;
  keywords: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: params.name,
    description: params.description,
    url: `${SITE_URL}/simulyatsiya/${params.slug}`,
    inLanguage: 'uz',
    learningResourceType: 'Interactive simulation',
    educationalLevel: params.difficulty,
    keywords: params.keywords.join(', '),
    isAccessibleForFree: true,
    isPartOf: { '@type': 'Course', name: params.sectionName },
    provider: { '@type': 'Organization', name: 'PhysicsLab UZ', url: SITE_URL },
  };
}

/** Renders one or more JSON-LD blocks. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
