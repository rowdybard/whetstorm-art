// Original Bonewrought mail set paintings.
const BONEWROUGHT_ARMOR_ITEM_ART = new Map<string, string>([
  ['crownforged_dreadhelm', '/ui/whetstorm/items/crownforged_dreadhelm.webp'],
  ['crownforged_warspaulders', '/ui/whetstorm/items/crownforged_warspaulders.webp'],
  ['crownforged_girdle', '/ui/whetstorm/items/crownforged_girdle.webp'],
]);

export function bonewroughtArmorItemImageUrl(id: string): string | null {
  return BONEWROUGHT_ARMOR_ITEM_ART.get(id) ?? null;
}
