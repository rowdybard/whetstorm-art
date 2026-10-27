// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_THIRTEEN_ITEM_ART = new Map<string, string>([
  ['mirejaw_biteblade', '/ui/whetstorm/items/mirejaw_biteblade.webp'],
  ['mirejaw_oracle_staff', '/ui/whetstorm/items/mirejaw_oracle_staff.webp'],
  ['fen_reaver_glaive', '/ui/whetstorm/items/fen_reaver_glaive.webp'],
  ['voss_sanctified_mace', '/ui/whetstorm/items/voss_sanctified_mace.webp'],
]);

export function weaponBatchThirteenItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_THIRTEEN_ITEM_ART.get(id) ?? null;
}
