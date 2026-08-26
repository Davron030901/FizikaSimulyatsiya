import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border py-8">
      <div className="container-page flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>PhysicsLab UZ &mdash; interaktiv fizika simulyatsiyalari</p>
        <div className="flex items-center gap-4">
          <Link href="/haqida" className="transition-colors hover:text-foreground">
            Loyiha haqida
          </Link>
          <span className="font-mono text-xs">v0.6.0</span>
        </div>
      </div>
    </footer>
  );
}
