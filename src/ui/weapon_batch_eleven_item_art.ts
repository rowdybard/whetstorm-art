// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_ELEVEN_ITEM_ART = new Map<string, string>([
  ['copper_flanged_mace', '/ui/whetstorm/items/copper_flanged_mace.webp'],
  ['ironbark_boar_spear', '/ui/whetstorm/items/ironbark_boar_spear.webp'],
  ['tradesman_hatchet', '/ui/whetstorm/items/tradesman_hatchet.webp'],
  ['drovers_staff', '/ui/whetstorm/items/drovers_staff.webp'],
]);

export function weaponBatchElevenItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_ELEVEN_ITEM_ART.get(id) ?? null;
}
