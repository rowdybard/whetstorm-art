import { ORIGINAL_ARMORY_ART_DIR } from './armory_guildmark_art';

// Original 2D paintings; held models are separate assets.
const IDS: ReadonlySet<string> = new Set(['hoarfrost_vigil_staff', 'everwinter_wand', 'winterbite']);

export function hoarfrostTrioArmorySkinArt(id: string): string | null {
  return IDS.has(id) ? `${ORIGINAL_ARMORY_ART_DIR}/${id}.webp` : null;
}
