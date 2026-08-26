'use client';

import { AdminGuard } from '@/components/admin/AdminGuard';
import { KindPill, StatusPill } from '@/components/admin/StatusPill';
import { Skeleton } from '@/components/ui/Skeleton';
import { ApiError } from '@/lib/api';
import { adminApi, clearToken, type AdminTopicRow } from '@/lib/adminApi';
import { cn } from '@/lib/utils';
import { AlertCircle, LogOut, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Filter = 'ALL' | 'DEFAULT' | 'HTML' | 'DRAFT';

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: 'ALL', label: 'Barchasi' },
  { id: 'DEFAULT', label: 'Demo' },
  { id: 'HTML', label: "To'liq" },
  { id: 'DRAFT', label: 'Qoralama' },
];

export default function AdminDashboardPage() {
  return <AdminGuard>{(user) => <Dashboard userName={user.name} />}</AdminGuard>;
}

function Dashboard({ userName }: { userName: string }) {
  const router = useRouter();
  const [rows, setRows] = useState<AdminTopicRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('ALL');
  const [term, setTerm] = useState('');

  useEffect(() => {
    adminApi
      .topics()
      .then(setRows)
      .catch((caught: unknown) =>
        setError(caught instanceof ApiError ? caught.message : "Ma'lumot yuklanmadi"),
      );
  }, []);

  const counts = useMemo(() => {
    if (!rows) return { ALL: 0, DEFAULT: 0, HTML: 0, DRAFT: 0 };
    return {
      ALL: rows.length,
      DEFAULT: rows.filter((row) => row.kind === 'DEFAULT').length,
      HTML: rows.filter((row) => row.kind === 'HTML').length,
      DRAFT: rows.filter((row) => row.status === 'DRAFT').length,
    };
  }, [rows]);

  const visible = useMemo(() => {
    if (!rows) return [];
    const search = term.trim().toLowerCase();

    return rows.filter((row) => {
      if (filter === 'DRAFT' && row.status !== 'DRAFT') return false;
      if ((filter === 'DEFAULT' || filter === 'HTML') && row.kind !== filter) return false;
      if (!search) return true;
      return (
        row.titleUz.toLowerCase().includes(search) ||
        row.code.startsWith(search) ||
        row.sectionTitle.toLowerCase().includes(search)
      );
    });
  }, [rows, filter, term]);

  function logout() {
    clearToken();
    router.replace('/admin/login');
  }

  return (
    <div className="container-page py-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {userName} · {counts.HTML} ta to&apos;liq, {counts.DEFAULT} ta demo simulyatsiya
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut size={15} aria-hidden="true" />
          Chiqish
        </button>
      </header>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Mavzu nomi yoki kodi..."
            aria-label="Mavzu qidirish"
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                'min-h-11 rounded-xl border px-3 text-sm font-medium transition-colors',
                filter === item.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
              <span className="ml-1.5 opacity-70">{counts[item.id]}</span>
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="mt-6 flex items-start gap-2 rounded-xl border border-danger/25 bg-danger/10 p-3.5 text-sm text-danger">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}

      {!rows && !error ? (
        <div className="mt-6 space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : null}

      {rows ? (
        <>
          <p className="mt-6 text-sm text-muted-foreground">{visible.length} ta mavzu</p>
          <ul className="mt-3 space-y-2">
            {visible.map((row) => (
              <li key={row.slug}>
                <Link
                  href={`/admin/simulyatsiya/${row.slug}`}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/50"
                >
                  <span
                    className="w-12 shrink-0 rounded-md px-1.5 py-0.5 text-center font-mono text-xs font-semibold"
                    style={{ backgroundColor: `${row.sectionColor}22`, color: row.sectionColor }}
                  >
                    {row.code}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{row.titleUz}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {row.sectionTitle}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <KindPill kind={row.kind} />
                    <StatusPill status={row.status} />
                    <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                      v{row.version}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
