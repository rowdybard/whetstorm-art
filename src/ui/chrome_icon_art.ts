// Original Whetstorm SVG artwork; closed registries preserve existing identities.

import { hudArtworkUrl } from './hud_art';
import type { UiIconName } from './ui_icons';

const CHROME_ICON_DIR = '/ui/whetstorm/chrome';

export const CHROME_ART_IDS: ReadonlySet<UiIconName> = new Set<UiIconName>([
  'arena',
  'bags',
  'book',
  'cards',
  'character',
  'chest',
  'crafting',
  'crown',
  'dfinder',
  'donate',
  'emote',
  'harvest-journal',
  'leaderboard',
  'map',
  'perfecting',
  'professions',
  'questlog',
  'social',
  'spellbook',
  'talents',
]);

/** True when `name` ships painted launcher art (and so is a primary destination). */
export function hasChromeIconArt(name: string): name is UiIconName {
  return CHROME_ART_IDS.has(name as UiIconName);
}

/** Static URL of a chrome icon's painted art, or null when the name ships no art. */
export function chromeIconUrl(name: string): string | null {
  return hasChromeIconArt(name)
    ? (hudArtworkUrl('chrome', name) ?? `${CHROME_ICON_DIR}/${name}.svg`)
    : null;
}
