// Original farming material paintings in a closed map.
const ART = new Map<string, string>([
  ['fine_vale_wheat', '/ui/whetstorm/items/fine_vale_wheat.webp'],
  ['brook_carrot_seed', '/ui/whetstorm/items/brook_carrot_seed.webp'],
  ['fine_bog_beet', '/ui/whetstorm/items/fine_bog_beet.webp'],
  ['bog_beet_seed', '/ui/whetstorm/items/bog_beet_seed.webp'],
]);

export function farmMaterialsOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
