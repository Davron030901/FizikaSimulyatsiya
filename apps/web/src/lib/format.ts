import type { Difficulty } from '@/types';

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  OSON: 'Oson',
  ORTA: "O'rta",
  QIYIN: 'Qiyin',
};

export const DIFFICULTY_CLASSES: Record<Difficulty, string> = {
  OSON: 'bg-success/12 text-success border-success/25',
  ORTA: 'bg-warning/12 text-warning border-warning/25',
  QIYIN: 'bg-danger/12 text-danger border-danger/25',
};

/** Converts "#3B82F6" into "59 130 246" so it can be used inside rgb(... / alpha). */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const value = Number.parseInt(
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean,
    16,
  );
  if (Number.isNaN(value)) return '59 130 246';
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
}

export function plural(count: number, word: string): string {
  return `${count} ta ${word}`;
}
