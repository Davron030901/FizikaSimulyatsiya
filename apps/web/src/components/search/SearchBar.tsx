'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export function SearchBar({
  initialValue = '',
  autoFocus = false,
  placeholder = 'Mavzu qidirish...',
}: {
  initialValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const term = value.trim();
    if (term.length < 2) return;
    router.push(`/qidiruv?q=${encodeURIComponent(term)}`);
  }

  return (
    <form onSubmit={onSubmit} role="search" className="relative w-full">
      <Search
        size={17}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Mavzu qidirish"
        className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
      {value ? (
        <button
          type="button"
          onClick={() => setValue('')}
          aria-label="Tozalash"
          className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
        >
          <X size={16} />
        </button>
      ) : null}
    </form>
  );
}
