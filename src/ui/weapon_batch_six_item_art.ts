// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_SIX_ITEM_ART = new Map<string, string>([
  ['tunnelkings_spade', '/ui/whetstorm/items/tunnelkings_spade.webp'],
  ['briarroot_staff', '/ui/whetstorm/items/briarroot_staff.webp'],
  ['gorraks_cruel_chopper', '/ui/whetstorm/items/gorraks_cruel_chopper.webp'],
  ['moggers_shiv', '/ui/whetstorm/items/moggers_shiv.webp'],
]);

export function weaponBatchSixItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_SIX_ITEM_ART.get(id) ?? null;
}
