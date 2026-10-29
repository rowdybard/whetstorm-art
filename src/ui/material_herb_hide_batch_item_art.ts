// Original herb and hide paintings in a closed map.
const ART = new Map<string, string>([
  ['pristine_hide', '/ui/whetstorm/items/pristine_hide.webp'],
  ['goldleaf_herb', '/ui/whetstorm/items/goldleaf_herb.webp'],
  ['sunpetal_herb', '/ui/whetstorm/items/sunpetal_herb.webp'],
  ['fine_goldleaf_herb', '/ui/whetstorm/items/fine_goldleaf_herb.webp'],
]);

export function materialHerbHideBatchItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
