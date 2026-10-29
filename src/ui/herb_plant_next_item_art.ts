// Original herb and farm produce paintings in a closed map.
const ART = new Map<string, string>([
  ['fine_sunpetal_herb', '/ui/whetstorm/items/fine_sunpetal_herb.webp'],
  ['brook_carrot', '/ui/whetstorm/items/brook_carrot.webp'],
  ['fine_brook_carrot', '/ui/whetstorm/items/fine_brook_carrot.webp'],
  ['bog_beet', '/ui/whetstorm/items/bog_beet.webp'],
]);

export function herbPlantNextItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
