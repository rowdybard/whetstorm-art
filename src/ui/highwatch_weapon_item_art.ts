// Original paintings for Highwatch vendor weapons.
const HIGHWATCH_WEAPON_ITEM_ART = new Map<string, string>([
  ['highwatch_warblade', '/ui/whetstorm/items/highwatch_warblade.webp'],
  ['highwatch_greatsword', '/ui/whetstorm/items/highwatch_greatsword.webp'],
]);

export function highwatchWeaponItemImageUrl(id: string): string | null {
  return HIGHWATCH_WEAPON_ITEM_ART.get(id) ?? null;
}
