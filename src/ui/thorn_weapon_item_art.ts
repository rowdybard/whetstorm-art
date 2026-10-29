// Original paintings for the thorn weapons.
const THORN_WEAPON_ITEM_ART = new Map<string, string>([
  ['cragthorn_greatstaff', '/ui/whetstorm/items/cragthorn_greatstaff.webp'],
  ['gravewyrm_thornmaul', '/ui/whetstorm/items/gravewyrm_thornmaul.webp'],
]);

export function thornWeaponItemImageUrl(id: string): string | null {
  return THORN_WEAPON_ITEM_ART.get(id) ?? null;
}
