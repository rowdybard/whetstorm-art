// Original paintings for progression reward items.
const ART = new Map<string, string>([
  ['heroic_mark', '/ui/whetstorm/items/heroic_mark.webp'],
  ['emissary_cache', '/ui/whetstorm/items/emissary_cache.webp'],
  ['makers_ember', '/ui/whetstorm/items/makers_ember.webp'],
]);

export function progressionRewardItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
