// Original paintings for two rift weapons.
const FROST_PIT_ITEM_ART = new Map<string, string>([
  ['hoarfrost_edge', '/ui/whetstorm/items/hoarfrost_edge.webp'],
  ['pitlords_cleaver', '/ui/whetstorm/items/pitlords_cleaver.webp'],
]);

export function frostPitItemImageUrl(id: string): string | null {
  return FROST_PIT_ITEM_ART.get(id) ?? null;
}
