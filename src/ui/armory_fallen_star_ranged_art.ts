// Original 2D paintings for two retained Fallen Star cosmetics.
const IDS = new Set(['encore_bow', 'meteorlatch_crossbow']);

export function fallenStarRangedArmorySkinArt(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/armory/${id}.webp` : null;
}
