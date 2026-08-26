'use client';

import { AdminGuard } from '@/components/admin/AdminGuard';
import { HtmlEditor } from '@/components/admin/HtmlEditor';
import { LivePreview } from '@/components/admin/LivePreview';
import { KindPill, StatusPill } from '@/components/admin/StatusPill';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ApiError } from '@/lib/api';
import { adminApi, type AdminSimulation } from '@/lib/adminApi';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
  ExternalLink,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type Kind = 'DEFAULT' | 'HTML' | 'EXTERNAL';

const KIND_OPTIONS: Array<{ id: Kind; label: string; hint: string }> = [
  { id: 'DEFAULT', label: 'Demo', hint: 'Avtomatik yaratilgan namoyish' },
  { id: 'HTML', label: "To'liq HTML", hint: "O'zingiz yozgan simulyatsiya" },
  { id: 'EXTERNAL', label: 'Tashqi manzil', hint: 'Boshqa saytdagi simulyatsiya' },
];

export default function AdminEditorPage({ params }: { params: { topic: string } }) {
  return <AdminGuard>{() => <Editor slug={params.topic} />}</AdminGuard>;
}

function Editor({ slug }: { slug: string }) {
  const [data, setData] = useState<AdminSimulation | null>(null);
  const [kind, setKind] = useState<Kind>('DEFAULT');
  const [html, setHtml] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<'save' | 'publish' | 'reset' | null>(null);

  const load = useCallback(async () => {
    try {
      const result = await adminApi.simulation(slug);
      setData(result);
      setKind((result.simulation?.kind as Kind) ?? 'DEFAULT');
      setHtml(result.simulation?.htmlContent ?? '');
      setExternalUrl(result.simulation?.externalUrl ?? '');
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Ma'lumot yuklanmadi");
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save(status: 'DRAFT' | 'PUBLISHED') {
    setError(null);
    setNotice(null);
    setBusy(status === 'DRAFT' ? 'save' : 'publish');

    try {
      const result = await adminApi.save(slug, {
        kind,
        status,
        ...(kind === 'HTML' ? { htmlContent: html } : {}),
        ...(kind === 'EXTERNAL' ? { externalUrl } : {}),
      });
      setNotice(
        status === 'PUBLISHED'
          ? `Nashr qilindi (v${result.version}) — mavzu sahifasida ko'rinadi`
          : `Qoralama saqlandi (v${result.version})`,
      );
      await load();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Saqlanmadi');
    } finally {
      setBusy(null);
    }
  }

  async function reset() {
    if (!confirm("Simulyatsiya demo holatiga qaytariladi. HTML kod o'chadi. Davom etamizmi?")) {
      return;
    }
    setError(null);
    setNotice(null);
    setBusy('reset');

    try {
      await adminApi.reset(slug);
      setHtml('');
      setExternalUrl('');
      setKind('DEFAULT');
      setNotice('Demo holatiga qaytarildi');
      await load();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Qaytarilmadi');
    } finally {
      setBusy(null);
    }
  }

  function download() {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!data) {
    return (
      <div className="container-page py-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-6 h-[480px] rounded-2xl" />
      </div>
    );
  }

  const { topic, simulation } = data;

  return (
    <div className="container-page py-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Barcha mavzular
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="font-mono text-xs text-muted-foreground">
            {topic.code} · {topic.section.titleUz}
          </span>
          <h1 className="mt-0.5 text-xl font-bold tracking-tight">{topic.titleUz}</h1>
          <div className="mt-2 flex items-center gap-2">
            <KindPill kind={simulation?.kind ?? 'DEFAULT'} />
            <StatusPill status={simulation?.status ?? 'PUBLISHED'} />
            <span className="font-mono text-xs text-muted-foreground">
              v{simulation?.version ?? 0}
            </span>
          </div>
        </div>

        <Link
          href={`/simulyatsiya/${slug}`}
          target="_blank"
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ExternalLink size={15} aria-hidden="true" />
          Sahifani ochish
        </Link>
      </header>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Simulyatsiya turi">
        {KIND_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setKind(option.id)}
            aria-pressed={kind === option.id}
            title={option.hint}
            className={cn(
              'min-h-11 rounded-xl border px-4 text-sm font-medium transition-colors',
              kind === option.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {kind === 'EXTERNAL' ? (
        <div className="mt-5 max-w-xl">
          <label htmlFor="externalUrl" className="mb-1.5 block text-sm font-medium">
            Tashqi manzil
          </label>
          <input
            id="externalUrl"
            type="url"
            value={externalUrl}
            onChange={(event) => setExternalUrl(event.target.value)}
            placeholder="https://phet.colorado.edu/..."
            className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary"
          />
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {kind === 'HTML' ? (
          <HtmlEditor value={html} onChange={setHtml} onError={setError} />
        ) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            {kind === 'DEFAULT'
              ? "Bu mavzu avtomatik yaratilgan demo simulyatsiyani ko'rsatmoqda. To'liq simulyatsiya joylash uchun yuqoridan «To'liq HTML» ni tanlang."
              : "Tashqi manzil rejimida kod tahrirlanmaydi. Foydalanuvchi to'g'ridan-to'g'ri ko'rsatilgan saytga yo'naltiriladi."}
          </div>
        )}

        <LivePreview slug={slug} mode={kind} html={html} />
      </div>

      {error ? (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-danger/25 bg-danger/10 p-3.5 text-sm text-danger">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}

      {notice ? (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-success/25 bg-success/10 p-3.5 text-sm text-success">
          <CheckCircle2 size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {notice}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <Button onClick={() => void save('PUBLISHED')} disabled={busy !== null}>
          {busy === 'publish' ? <Loader2 size={16} className="animate-spin" /> : null}
          Nashr qilish
        </Button>
        <Button variant="secondary" onClick={() => void save('DRAFT')} disabled={busy !== null}>
          {busy === 'save' ? <Loader2 size={16} className="animate-spin" /> : null}
          Qoralama saqlash
        </Button>

        {kind === 'HTML' && html ? (
          <Button variant="ghost" onClick={download}>
            <Download size={15} aria-hidden="true" />
            Yuklab olish
          </Button>
        ) : null}

        <Button
          variant="ghost"
          onClick={() => void reset()}
          disabled={busy !== null || simulation?.kind === 'DEFAULT'}
          className="ml-auto text-danger hover:bg-danger/10"
        >
          {busy === 'reset' ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RotateCcw size={15} aria-hidden="true" />
          )}
          Demo holatiga qaytarish
        </Button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Qoralama</strong> holatidagi simulyatsiya
        foydalanuvchilarga ko&apos;rinmaydi — ular demo variantni ko&apos;radi. Bu yerdagi
        ko&apos;rinish esa haqiqiy kodni ko&apos;rsatadi.
      </p>
    </div>
  );
}
