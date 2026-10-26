// Original Whetstorm SVG artwork; closed registries preserve existing identities.
import type { PlayerClass } from '../sim/types';

const CLASS_ICON_DIR = '/ui/whetstorm/classes';

export const CLASS_ART_IDS: ReadonlySet<PlayerClass> = new Set<PlayerClass>([
  'warrior',
  'paladin',
  'hunter',
  'rogue',
  'priest',
  'shaman',
  'mage',
  'warlock',
  'druid',
]);

/** True when `id` is a class that ships painted emblem art. */
export function hasClassIconArt(id: string): id is PlayerClass {
  return CLASS_ART_IDS.has(id as PlayerClass);
}

/** Static URL of a class's painted emblem, or null when `id` is not a class. */
export function classIconUrl(id: string): string | null {
  return hasClassIconArt(id) ? `${CLASS_ICON_DIR}/${id}.svg` : null;
}
