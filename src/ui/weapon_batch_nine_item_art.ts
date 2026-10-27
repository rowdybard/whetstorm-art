// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_NINE_ITEM_ART = new Map<string, string>([
  ['gravecaller_blade', '/ui/whetstorm/items/gravecaller_blade.webp'],
  ['widowfang_dirk', '/ui/whetstorm/items/widowfang_dirk.webp'],
  ['gravecaller_staff', '/ui/whetstorm/items/gravecaller_staff.webp'],
  ['bristleback_maul', '/ui/whetstorm/items/bristleback_maul.webp'],
]);

export function weaponBatchNineItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_NINE_ITEM_ART.get(id) ?? null;
}
