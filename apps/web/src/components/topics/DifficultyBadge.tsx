import { Badge } from '@/components/ui/Badge';
import { DIFFICULTY_CLASSES, DIFFICULTY_LABELS } from '@/lib/format';
import type { Difficulty } from '@/types';

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Badge className={DIFFICULTY_CLASSES[difficulty]}>{DIFFICULTY_LABELS[difficulty]}</Badge>;
}
