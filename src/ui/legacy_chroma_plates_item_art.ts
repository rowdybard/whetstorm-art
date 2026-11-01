// Original paintings for retained Combat Mech chroma plates.
const ART = new Map<string, string>([
  ['magenta_cyan_armor_plate', '/ui/whetstorm/items/magenta_cyan_armor_plate.webp'],
  ['orange_steel_armor_plate', '/ui/whetstorm/items/orange_steel_armor_plate.webp'],
  ['steel_orange_armor_plate', '/ui/whetstorm/items/steel_orange_armor_plate.webp'],
  ['forest_pink_armor_plate', '/ui/whetstorm/items/forest_pink_armor_plate.webp'],
]);

export function legacyChromaPlatesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
