// Original Whetstorm paintings for the lower Slagcrown PvP set.
const IDS = new Set(['vanguard_warlock_destruction_gloves', 'vanguard_warlock_destruction_legs']);

export function slagcrownLowerItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
