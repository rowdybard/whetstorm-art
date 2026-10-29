// Original tier-three farming material paintings in a closed map.
const ART = new Map<string, string>([
  ['highland_barley_seed', '/ui/whetstorm/items/highland_barley_seed.webp'],
  ['fine_highland_barley', '/ui/whetstorm/items/fine_highland_barley.webp'],
  ['frost_gourd_seed', '/ui/whetstorm/items/frost_gourd_seed.webp'],
  ['fine_frost_gourd', '/ui/whetstorm/items/fine_frost_gourd.webp'],
]);

export function farmHighlandMaterialItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
