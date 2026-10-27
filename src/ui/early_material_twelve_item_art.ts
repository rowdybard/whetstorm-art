// Original early potion paintings in a closed map.
const EARLY_MATERIAL_TWELVE_ART = new Map<string, string>([
  ['minor_healing_potion', '/ui/whetstorm/items/minor_healing_potion.webp'],
  ['minor_mana_potion', '/ui/whetstorm/items/minor_mana_potion.webp'],
  ['lesser_mana_potion', '/ui/whetstorm/items/lesser_mana_potion.webp'],
  ['healing_potion', '/ui/whetstorm/items/healing_potion.webp'],
]);

export function earlyMaterialTwelveItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_TWELVE_ART.get(id) ?? null;
}
