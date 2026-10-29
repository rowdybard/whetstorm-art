// Original paintings for two forge hammers.
const FORGE_HAMMER_ITEM_ART = new Map<string, string>([
  ['varkhul_forgebreaker', '/ui/whetstorm/items/varkhul_forgebreaker.webp'],
  ['forgefathers_warhammer', '/ui/whetstorm/items/forgefathers_warhammer.webp'],
]);

export function forgeHammerItemImageUrl(id: string): string | null {
  return FORGE_HAMMER_ITEM_ART.get(id) ?? null;
}
