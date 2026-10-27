// Individually painted, original Whetstorm art for existing starter rations.
// A closed map prevents arbitrary IDs from becoming asset paths.
const STARTER_ITEM_ART = new Map<string, string>([
  ['baked_bread', '/ui/whetstorm/items/baked_bread.webp'],
  ['spring_water', '/ui/whetstorm/items/spring_water.webp'],
]);

export function starterItemImageUrl(id: string): string | null {
  return STARTER_ITEM_ART.get(id) ?? null;
}
