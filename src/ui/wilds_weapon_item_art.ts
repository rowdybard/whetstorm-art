// Original paintings for two wilds weapons.
const WILDS_WEAPON_ITEM_ART = new Map<string, string>([
  ['nightfangs_greatstaff', '/ui/whetstorm/items/nightfangs_greatstaff.webp'],
  ['maul_of_the_scourged_wilds', '/ui/whetstorm/items/maul_of_the_scourged_wilds.webp'],
]);

export function wildsWeaponItemImageUrl(id: string): string | null {
  return WILDS_WEAPON_ITEM_ART.get(id) ?? null;
}
