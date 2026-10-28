// Original paintings for four early marsh weapons.
const WEAPON_BATCH_FIFTEEN_ITEM_ART = new Map<string, string>([
  ['mistcallers_edge', '/ui/whetstorm/items/mistcallers_edge.webp'],
  ['vaels_mist_staff', '/ui/whetstorm/items/vaels_mist_staff.webp'],
  ['riptide_dirk', '/ui/whetstorm/items/riptide_dirk.webp'],
  ['nhalias_dirgeblade', '/ui/whetstorm/items/nhalias_dirgeblade.webp'],
]);

export function weaponBatchFifteenItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_FIFTEEN_ITEM_ART.get(id) ?? null;
}
