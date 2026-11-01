// Original Season 2 Dreadquill lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_warlock_affliction_legs', '/ui/whetstorm/items/vanguard_warlock_affliction_legs.webp'],
  ['vanguard_warlock_affliction_gloves', '/ui/whetstorm/items/vanguard_warlock_affliction_gloves.webp'],
]);

export function dreadquillLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
