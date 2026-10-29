// Original profession accessory paintings in a closed map.
const ART = new Map<string, string>([
  ['gatherers_cache', '/ui/whetstorm/items/gatherers_cache.webp'],
  ['artisans_eye', '/ui/whetstorm/items/artisans_eye.webp'],
  ['makers_charm', '/ui/whetstorm/items/makers_charm.webp'],
]);

export function professionAccessoriesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
