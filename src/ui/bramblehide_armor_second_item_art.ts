// Original Roots' Bramblehide leather set paintings, second batch.
const BRAMBLEHIDE_ARMOR_SECOND_ITEM_ART = new Map<string, string>([
  ['bramblehide_harness', '/ui/whetstorm/items/bramblehide_harness.webp'],
  ['bramblehide_cinch', '/ui/whetstorm/items/bramblehide_cinch.webp'],
  ['bramblehide_legguards', '/ui/whetstorm/items/bramblehide_legguards.webp'],
]);

export function bramblehideArmorSecondItemImageUrl(id: string): string | null {
  return BRAMBLEHIDE_ARMOR_SECOND_ITEM_ART.get(id) ?? null;
}
