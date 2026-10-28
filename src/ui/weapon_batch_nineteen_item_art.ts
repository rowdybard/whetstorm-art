// Original paintings for early-zone vendor and rare-drop weapons.
const WEAPON_BATCH_NINETEEN_ITEM_ART = new Map<string, string>([
  ['bogiron_mace', '/ui/whetstorm/items/bogiron_mace.webp'],
  ['fenreed_staff', '/ui/whetstorm/items/fenreed_staff.webp'],
  ['mirefen_skinner', '/ui/whetstorm/items/mirefen_skinner.webp'],
  ['boneglass_shiv', '/ui/whetstorm/items/boneglass_shiv.webp'],
]);

export function weaponBatchNineteenItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_NINETEEN_ITEM_ART.get(id) ?? null;
}
