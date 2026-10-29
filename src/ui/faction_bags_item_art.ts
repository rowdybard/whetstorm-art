// Original faction bag paintings in a closed map.
const ART = new Map<string, string>([
  ['rift_surveyors_satchel', '/ui/whetstorm/items/rift_surveyors_satchel.webp'],
  ['clockwork_tinkers_pack', '/ui/whetstorm/items/clockwork_tinkers_pack.webp'],
  ['allied_vanguard_duffel', '/ui/whetstorm/items/allied_vanguard_duffel.webp'],
]);

export function factionBagsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
