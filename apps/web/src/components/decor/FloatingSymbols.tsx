import { cn } from '@/lib/utils';

/**
 * Fonda sekin suzib yuruvchi fizika belgilari.
 *
 * Uchta qaror:
 *  1. Bu server komponenti — brauzerga bitta ham JS bayti ketmaydi, harakat
 *     to'liq CSS animatsiyasi bilan qilinadi.
 *  2. Tasodifiy qiymatlar urug'lantirilgan generatordan olinadi, shuning uchun
 *     server va klient bir xil natija beradi — hydration mos kelmasligi bo'lmaydi.
 *  3. Belgilar `aria-hidden` va `pointer-events-none`: ekran o'quvchi ularni
 *     o'qimaydi, sichqoncha ham ilinmaydi.
 */

const SYMBOLS = [
  'v', 'a', 'F', 'm', 't', 's', 'E', 'p', 'k', 'g', 'r', 'T', 'f', 'I', 'L',
  'W', 'P', 'Q', 'N', 'R', 'h', 'c', 'x', 'y', 'q', 'n', 'd', 'A', 'V', 'B',
  'ω', 'α', 'θ', 'λ', 'ρ', 'μ', 'Δ', 'Σ', 'π', 'η', 'φ', 'γ', 'Ω', 'τ', 'ε', 'ν',
  '∫', '√', '∞', '∂',
];

/** Vaqti-vaqti bilan uchraydigan qisqa formulalar — ko'rinishga jon kiritadi. */
const FORMULAS = [
  'F = ma',
  'E = mc²',
  'v = λf',
  'P = ρgh',
  'p = mv',
  'E = ½mv²',
  'a = v²/r',
  'W = Fs',
  'T = 2π√(l/g)',
  'F = -kx',
  'pV = νRT',
  'E = hν',
  'I = U/R',
  'Q = cmΔT',
  'n₁sinα = n₂sinβ',
  'F = qE',
  'λ = h/p',
  'E = ½CU²',
];

/** Bo'limlar palitrasi — belgilar sayt ranglari bilan bir oilada bo'lsin. */
const COLORS = [
  '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4',
  '#10B981', '#6366F1', '#78716C', '#0EA5E9',
  '#F97316', '#DB2777', '#14B8A6', '#65A30D',
];

/** Mulberry32 — kichik, tez va takrorlanadigan generator. */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Props {
  /** Nechta belgi chiziladi. Mobil uchun kamroq qiymat bering. */
  count?: number;
  /** Urug' — o'zgartirilsa joylashuv boshqacha bo'ladi, lekin baribir barqaror. */
  seed?: number;
  /** Qanchalik ko'rinsin: 1 = odatiy. */
  intensity?: number;
  className?: string;
}

export function FloatingSymbols({
  count = 28,
  seed = 20260826,
  intensity = 1,
  className,
}: Props) {
  const random = seededRandom(seed);

  const items = Array.from({ length: count }, (_, index) => {
    // Har 6-belgi formula bo'lsin: ko'p bo'lsa shovqin, kam bo'lsa bir xillik.
    const isFormula = index % 6 === 2;
    const text = isFormula
      ? (FORMULAS[Math.floor(random() * FORMULAS.length)] ?? 'F = ma')
      : (SYMBOLS[Math.floor(random() * SYMBOLS.length)] ?? 'v');

    const size = isFormula ? 13 + random() * 7 : 16 + random() * 30;
    const baseOpacity = isFormula ? 0.05 : 0.07;

    return {
      key: `symbol-${index}`,
      text,
      left: random() * 100,
      top: 8 + random() * 96,
      size,
      color: COLORS[Math.floor(random() * COLORS.length)] ?? COLORS[0],
      opacity: (baseOpacity + random() * 0.06) * intensity,
      duration: 26 + random() * 30,
      delay: -random() * 45,
      drift: (random() - 0.5) * 90,
      spin: (random() - 0.5) * 24,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none',
        className,
      )}
    >
      {items.map((item) => (
        <span
          key={item.key}
          className="physics-symbol"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}px`,
            color: item.color,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            ['--symbol-opacity' as string]: item.opacity,
            ['--symbol-drift' as string]: `${item.drift}px`,
            ['--symbol-spin' as string]: `${item.spin}deg`,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
