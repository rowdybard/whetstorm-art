// Original paintings for Zone 3 weapons.
const WEAPON_BATCH_TWENTYTHREE_ITEM_ART = new Map<string, string>([
  ['ironvein_lantern_staff', '/ui/whetstorm/items/ironvein_lantern_staff.webp'],
  ['emberfang_warblade', '/ui/whetstorm/items/emberfang_warblade.webp'],
  ['brutoks_maul', '/ui/whetstorm/items/brutoks_maul.webp'],
  ['crag_warden_cudgel', '/ui/whetstorm/items/crag_warden_cudgel.webp'],
]);

export function weaponBatchTwentythreeItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_TWENTYTHREE_ITEM_ART.get(id) ?? null;
}
