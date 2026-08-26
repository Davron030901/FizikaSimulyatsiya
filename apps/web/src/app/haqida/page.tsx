import { ApiStatus } from '@/components/system/ApiStatus';
import { api } from '@/lib/api';
import type { Stats } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loyiha haqida',
  alternates: { canonical: "/haqida" },
  description: "PhysicsLab UZ — o'zbek tilidagi interaktiv fizika simulyatsiyalari platformasi.",
};

/**
 * The API runs as a separate service that may be asleep during a Vercel build,
 * so this page is rendered per request instead of being prerendered with a
 * frozen error state. Responses are still cached by the fetch-level revalidate.
 */
export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  let stats: Stats | null = null;
  try {
    stats = await api.stats();
  } catch {
    stats = null;
  }

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold tracking-tight">Loyiha haqida</h1>

      <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          PhysicsLab UZ — o&apos;zbek tilidagi interaktiv fizika simulyatsiyalari platformasi.
          Maqsad oddiy: formulani yodlash o&apos;rniga uning ortidagi hodisani ko&apos;rish.
        </p>
        <p>
          Hozircha mexanika bo&apos;limi qamrab olingan: {stats?.sections ?? 9} ta katta bo&apos;lim
          va {stats?.topics ?? 79} ta mavzu. Har bir mavzuda nazariya, formulalar va alohida
          simulyatsiya bor.
        </p>
        <p>
          Simulyatsiyalarning bir qismi hozircha <strong className="text-foreground">demo rejimda</strong>{' '}
          ishlaydi — animatsiya parametrlarga javob beradi, lekin to&apos;liq fizik model
          tayyorlanmoqda. Ular bosqichma-bosqich haqiqiy simulyatsiyalar bilan almashtiriladi.
        </p>
      </div>

      {stats ? (
        <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Bo'limlar" value={stats.sections} />
          <Stat label="Mavzular" value={stats.topics} />
          <Stat label="To'liq simulyatsiya" value={stats.realSimulations} />
          <Stat label="Demo rejim" value={stats.demoSimulations} />
        </dl>
      ) : null}

      <div className="mt-10 max-w-2xl">
        <ApiStatus />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-xl font-semibold">{value}</dd>
    </div>
  );
}
