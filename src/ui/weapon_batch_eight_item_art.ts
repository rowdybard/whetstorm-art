// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_EIGHT_ITEM_ART = new Map<string, string>([
  ['eastbrook_greatsword', '/ui/whetstorm/items/eastbrook_greatsword.webp'],
  ['bronzework_mace', '/ui/whetstorm/items/bronzework_mace.webp'],
  ['vale_carving_knife', '/ui/whetstorm/items/vale_carving_knife.webp'],
  ['hickory_shortstaff', '/ui/whetstorm/items/hickory_shortstaff.webp'],
]);

export function weaponBatchEightItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_EIGHT_ITEM_ART.get(id) ?? null;
}
