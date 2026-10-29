// Original paintings for obtainable cloth armor.
const CLOTH_BROOD_ITEM_ART = new Map<string, string>([
  ['wyrmcult_grand_robe', '/ui/whetstorm/items/wyrmcult_grand_robe.webp'],
  ['wyrmcult_soulsteps', '/ui/whetstorm/items/wyrmcult_soulsteps.webp'],
  ['moonshroud_robe', '/ui/whetstorm/items/moonshroud_robe.webp'],
  ['necromancers_legwraps', '/ui/whetstorm/items/necromancers_legwraps.webp'],
]);

export function clothBroodItemImageUrl(id: string): string | null {
  return CLOTH_BROOD_ITEM_ART.get(id) ?? null;
}
