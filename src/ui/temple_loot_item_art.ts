// Original paintings for temple loot.
const TEMPLE_LOOT_ART = new Map<string, string>([
  ['pale_pearl', '/ui/whetstorm/items/pale_pearl.webp'],
  ['moonpale_scale', '/ui/whetstorm/items/moonpale_scale.webp'],
  ['briny_idol', '/ui/whetstorm/items/briny_idol.webp'],
]);

export function templeLootItemImageUrl(id: string): string | null {
  return TEMPLE_LOOT_ART.get(id) ?? null;
}
