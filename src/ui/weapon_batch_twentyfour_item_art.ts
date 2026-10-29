// Original paintings for four catalog weapons.
const WEAPON_BATCH_TWENTYFOUR_ITEM_ART = new Map<string, string>([
  ['valeborn_spellblade', '/ui/whetstorm/items/valeborn_spellblade.webp'],
  ['crossroads_saber', '/ui/whetstorm/items/crossroads_saber.webp'],
  ['duskforged_warblade', '/ui/whetstorm/items/duskforged_warblade.webp'],
  ['ridgebreaker', '/ui/whetstorm/items/ridgebreaker.webp'],
]);

export function weaponBatchTwentyfourItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_TWENTYFOUR_ITEM_ART.get(id) ?? null;
}
