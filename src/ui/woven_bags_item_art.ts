// Original woven bag paintings in a closed map.
const ART = new Map<string, string>([
  ['silkspun_satchel', '/ui/whetstorm/items/silkspun_satchel.webp'],
  ['duskweave_bag', '/ui/whetstorm/items/duskweave_bag.webp'],
  ['resonant_weave_bag', '/ui/whetstorm/items/resonant_weave_bag.webp'],
]);

export function wovenBagsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
