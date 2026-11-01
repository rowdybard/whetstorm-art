// Original paintings for the Season 2 Veilpsalm discipline priest lower armor.
const DISCIPLINE_PRIEST_LOWER_ART = new Map<string, string>([
  ['vanguard_priest_discipline_legs', '/ui/whetstorm/items/vanguard_priest_discipline_legs.webp'],
  ['vanguard_priest_discipline_gloves', '/ui/whetstorm/items/vanguard_priest_discipline_gloves.webp'],
]);

export function disciplinePriestLowerItemImageUrl(id: string): string | null {
  return DISCIPLINE_PRIEST_LOWER_ART.get(id) ?? null;
}
