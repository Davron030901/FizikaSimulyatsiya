import {
  Atom,
  AudioWaveform,
  BatteryCharging,
  CircleDot,
  Droplets,
  MoveRight,
  Orbit,
  RefreshCw,
  Scale,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icons are referenced by name in the database, so only this explicit map is bundled
 * instead of the whole lucide package.
 */
const ICONS: Record<string, LucideIcon> = {
  'move-right': MoveRight,
  zap: Zap,
  'battery-charging': BatteryCharging,
  'circle-dot': CircleDot,
  'refresh-cw': RefreshCw,
  'audio-waveform': AudioWaveform,
  orbit: Orbit,
  scale: Scale,
  droplets: Droplets,
};

export function SectionIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Atom;
  return <Icon size={size} aria-hidden="true" />;
}
