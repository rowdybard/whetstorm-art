// Original paintings for the Season 2 Veilpsalm discipline priest upper armor.
const DISCIPLINE_PRIEST_UPPER_ART = new Map<string, string>([
  ['vanguard_priest_discipline_helmet', '/ui/whetstorm/items/vanguard_priest_discipline_helmet.webp'],
  ['vanguard_priest_discipline_shoulder', '/ui/whetstorm/items/vanguard_priest_discipline_shoulder.webp'],
  ['vanguard_priest_discipline_chest', '/ui/whetstorm/items/vanguard_priest_discipline_chest.webp'],
]);

export function disciplinePriestUpperItemImageUrl(id: string): string | null {
  return DISCIPLINE_PRIEST_UPPER_ART.get(id) ?? null;
}
