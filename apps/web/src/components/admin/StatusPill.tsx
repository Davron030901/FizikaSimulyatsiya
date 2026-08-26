import { cn } from '@/lib/utils';

const KIND_LABELS: Record<string, string> = {
  DEFAULT: 'Demo',
  HTML: "To'liq",
  EXTERNAL: 'Tashqi',
};

export function KindPill({ kind }: { kind: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        kind === 'DEFAULT' && 'border-border bg-muted text-muted-foreground',
        kind === 'HTML' && 'border-success/25 bg-success/12 text-success',
        kind === 'EXTERNAL' && 'border-primary/25 bg-primary/12 text-primary',
      )}
    >
      {KIND_LABELS[kind] ?? kind}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const draft = status === 'DRAFT';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        draft
          ? 'border-warning/25 bg-warning/12 text-warning'
          : 'border-border bg-muted text-muted-foreground',
      )}
    >
      {draft ? 'Qoralama' : 'Nashr'}
    </span>
  );
}
