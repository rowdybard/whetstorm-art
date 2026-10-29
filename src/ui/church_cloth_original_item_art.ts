// Original paintings for Church Order cloth armor.
const CHURCH_CLOTH_ORIGINAL_ITEM_ART = new Map<string, string>([
  ['vestments_of_the_acolyte', '/ui/whetstorm/items/vestments_of_the_acolyte.webp'],
  ['cord_of_the_dawn', '/ui/whetstorm/items/cord_of_the_dawn.webp'],
  ['dawnlit_slippers', '/ui/whetstorm/items/dawnlit_slippers.webp'],
]);

export function churchClothOriginalItemImageUrl(id: string): string | null {
  return CHURCH_CLOTH_ORIGINAL_ITEM_ART.get(id) ?? null;
}
