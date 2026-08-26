'use client';

import { cn } from '@/lib/utils';
import { useMemo, useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react';

const MAX_BYTES = 2 * 1024 * 1024;

/**
 * Plain textarea with a synced line-number gutter. A full code editor would pull in
 * a large dependency for something admins use to paste a finished file.
 */
export function HtmlEditor({
  value,
  onChange,
  onError,
}: {
  value: string;
  onChange: (value: string) => void;
  onError: (message: string | null) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const lineCount = useMemo(() => Math.max(value.split('\n').length, 1), [value]);
  const bytes = useMemo(() => new Blob([value]).size, [value]);

  function syncScroll() {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Tab') return;
    event.preventDefault();

    const target = event.currentTarget;
    const { selectionStart, selectionEnd } = target;
    const next = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`;
    onChange(next);

    requestAnimationFrame(() => {
      target.selectionStart = target.selectionEnd = selectionStart + 2;
    });
  }

  async function readFile(file: File) {
    if (!file.name.endsWith('.html') && !file.name.endsWith('.htm')) {
      onError('Faqat .html fayl qabul qilinadi');
      return;
    }
    if (file.size > MAX_BYTES) {
      onError(`Fayl juda katta: ${(file.size / 1024 / 1024).toFixed(1)} MB (chegara 2 MB)`);
      return;
    }
    onError(null);
    onChange(await file.text());
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void readFile(file);
  }

  function onFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void readFile(file);
    event.target.value = '';
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">
          {lineCount} qator · {(bytes / 1024).toFixed(1)} KB
          {bytes > MAX_BYTES ? <span className="ml-2 text-danger">chegaradan oshdi</span> : null}
        </span>
        <label className="cursor-pointer text-xs font-medium text-primary hover:underline">
          .html yuklash
          <input type="file" accept=".html,.htm" onChange={onFileInput} className="sr-only" />
        </label>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          'relative flex min-h-[420px] flex-1 overflow-hidden rounded-xl border bg-card font-mono text-[13px]',
          dragging ? 'border-primary border-dashed' : 'border-border',
        )}
      >
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="select-none overflow-hidden border-r border-border bg-muted/40 px-2.5 py-3 text-right leading-[1.55] text-muted-foreground"
        >
          {Array.from({ length: lineCount }, (_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onScroll={syncScroll}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Simulyatsiya HTML kodi"
          placeholder={"<!DOCTYPE html>\n<html lang=\"uz\">\n  ...\n</html>\n\nYoki .html faylni shu yerga tashlang."}
          className="flex-1 resize-none bg-transparent px-3 py-3 leading-[1.55] outline-none placeholder:text-muted-foreground"
        />

        {dragging ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary/10 text-sm font-medium text-primary">
            Faylni qo&apos;yib yuboring
          </div>
        ) : null}
      </div>
    </div>
  );
}
