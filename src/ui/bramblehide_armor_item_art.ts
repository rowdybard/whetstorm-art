// Original Roots' Bramblehide leather set paintings.
const BRAMBLEHIDE_ARMOR_ITEM_ART = new Map<string, string>([
  ['bramblehide_crown', '/ui/whetstorm/items/bramblehide_crown.webp'],
  ['bramblehide_mantle', '/ui/whetstorm/items/bramblehide_mantle.webp'],
  ['bramblehide_grips', '/ui/whetstorm/items/bramblehide_grips.webp'],
  ['bramblehide_treads', '/ui/whetstorm/items/bramblehide_treads.webp'],
]);

export function bramblehideArmorItemImageUrl(id: string): string | null {
  return BRAMBLEHIDE_ARMOR_ITEM_ART.get(id) ?? null;
}
