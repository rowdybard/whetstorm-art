// Original farming hoe paintings in a closed map.
const ART = new Map<string, string>([
  ['bronze_hoe', '/ui/whetstorm/items/bronze_hoe.webp'],
  ['skysilver_hoe', '/ui/whetstorm/items/skysilver_hoe.webp'],
  ['osmium_hoe', '/ui/whetstorm/items/osmium_hoe.webp'],
  ['evergarden_hoe', '/ui/whetstorm/items/evergarden_hoe.webp'],
]);

export function farmingHoesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
