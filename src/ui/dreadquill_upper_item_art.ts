// Original Season 2 Dreadquill upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_warlock_affliction_helmet', '/ui/whetstorm/items/vanguard_warlock_affliction_helmet.webp'],
  ['vanguard_warlock_affliction_shoulder', '/ui/whetstorm/items/vanguard_warlock_affliction_shoulder.webp'],
  ['vanguard_warlock_affliction_chest', '/ui/whetstorm/items/vanguard_warlock_affliction_chest.webp'],
]);

export function dreadquillUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
