// Original paintings for the Basin and Deathless Court weapons.
const BASIN_COURT_ITEM_ART = new Map<string, string>([
  ['greatfang_of_the_basin', '/ui/whetstorm/items/greatfang_of_the_basin.webp'],
  ['scepter_of_the_deathless_court', '/ui/whetstorm/items/scepter_of_the_deathless_court.webp'],
]);

export function basinCourtItemImageUrl(id: string): string | null {
  return BASIN_COURT_ITEM_ART.get(id) ?? null;
}
