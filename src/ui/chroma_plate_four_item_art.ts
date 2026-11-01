// Original paintings for four retained Combat Mech plate items.
const CHROMA_PLATE_FOUR_ART = new Map<string, string>([
  ['alien_armor_plate', '/ui/whetstorm/items/alien_armor_plate.webp'],
  ['amber_crimson_armor_plate', '/ui/whetstorm/items/amber_crimson_armor_plate.webp'],
  ['crimson_amber_armor_plate', '/ui/whetstorm/items/crimson_amber_armor_plate.webp'],
  ['cyan_magenta_armor_plate', '/ui/whetstorm/items/cyan_magenta_armor_plate.webp'],
]);

export function chromaPlateFourItemImageUrl(id: string): string | null {
  return CHROMA_PLATE_FOUR_ART.get(id) ?? null;
}
