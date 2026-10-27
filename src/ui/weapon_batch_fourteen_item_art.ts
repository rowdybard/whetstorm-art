// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_FOURTEEN_ITEM_ART = new Map<string, string>([
  ['deacons_cleaver', '/ui/whetstorm/items/deacons_cleaver.webp'],
  ['staff_of_drowned_prayers', '/ui/whetstorm/items/staff_of_drowned_prayers.webp'],
  ['mistbinder_kris', '/ui/whetstorm/items/mistbinder_kris.webp'],
  ['fenshadow_maul', '/ui/whetstorm/items/fenshadow_maul.webp'],
]);

export function weaponBatchFourteenItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_FOURTEEN_ITEM_ART.get(id) ?? null;
}
