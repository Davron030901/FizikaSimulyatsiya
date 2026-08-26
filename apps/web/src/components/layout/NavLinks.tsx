'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/bolimlar', label: "Bo'limlar" },
  { href: '/qidiruv', label: 'Qidiruv' },
  { href: '/haqida', label: 'Haqida' },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Asosiy menyu" className="hidden items-center gap-1 md:flex">
      {LINKS.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
