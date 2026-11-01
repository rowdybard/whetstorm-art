// Original Whetstorm paintings for the lower Starwarden PvP set.
const IDS = new Set(['vanguard_druid_balance_gloves', 'vanguard_druid_balance_legs']);

export function starwardenLowerItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
