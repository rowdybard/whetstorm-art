// Original Whetstorm paintings for the upper Slagcrown PvP set.
const IDS = new Set(['vanguard_warlock_destruction_helmet', 'vanguard_warlock_destruction_shoulder', 'vanguard_warlock_destruction_chest']);

export function slagcrownUpperItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
