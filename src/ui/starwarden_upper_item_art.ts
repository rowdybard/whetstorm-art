// Original Whetstorm paintings for the upper Starwarden PvP set.
const IDS = new Set(['vanguard_druid_balance_helmet', 'vanguard_druid_balance_shoulder', 'vanguard_druid_balance_chest']);

export function starwardenUpperItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
