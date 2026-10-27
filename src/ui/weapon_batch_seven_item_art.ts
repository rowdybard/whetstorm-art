// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_SEVEN_ITEM_ART = new Map<string, string>([
  ['verlans_oathblade', '/ui/whetstorm/items/verlans_oathblade.webp'],
  ['hollow_vigil_staff', '/ui/whetstorm/items/hollow_vigil_staff.webp'],
  ['gravewardens_shiv', '/ui/whetstorm/items/gravewardens_shiv.webp'],
  ['moggers_copper_cudgel', '/ui/whetstorm/items/moggers_copper_cudgel.webp'],
]);

export function weaponBatchSevenItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_SEVEN_ITEM_ART.get(id) ?? null;
}
