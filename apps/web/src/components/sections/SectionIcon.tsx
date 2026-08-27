import {
  Atom,
  AudioWaveform,
  BatteryCharging,
  CircleDot,
  Droplets,
  Lightbulb,
  MoveRight,
  Orbit,
  PlugZap,
  RefreshCw,
  Scale,
  Thermometer,
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
  thermometer: Thermometer,
  'plug-zap': PlugZap,
  lightbulb: Lightbulb,
  atom: Atom,
};

export function SectionIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Atom;
  return <Icon size={size} aria-hidden="true" />;
}
