// Original dungeon bag paintings in a closed map.
const ART = new Map<string, string>([
  ['gravewoven_bag', '/ui/whetstorm/items/gravewoven_bag.webp'],
  ['mistcallers_duffel', '/ui/whetstorm/items/mistcallers_duffel.webp'],
  ['necromancers_reagent_satchel', '/ui/whetstorm/items/necromancers_reagent_satchel.webp'],
]);

export function dungeonBagsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
