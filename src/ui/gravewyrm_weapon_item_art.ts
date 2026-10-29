// Original paintings for the Gravewyrm's weapons.
const GRAVEWYRM_WEAPON_ITEM_ART = new Map<string, string>([
  ['wyrmfang_greatblade', '/ui/whetstorm/items/wyrmfang_greatblade.webp'],
  ['staff_of_the_gravewyrm', '/ui/whetstorm/items/staff_of_the_gravewyrm.webp'],
]);

export function gravewyrmWeaponItemImageUrl(id: string): string | null {
  return GRAVEWYRM_WEAPON_ITEM_ART.get(id) ?? null;
}
