// Original paintings for retained Combat Mech chroma items.
const ART = new Map<string, string>([
  ['pink_forest_armor_plate', '/ui/whetstorm/items/pink_forest_armor_plate.webp'],
  ['amethyst_silver_armor_plate', '/ui/whetstorm/items/amethyst_silver_armor_plate.webp'],
  ['ivory_copper_armor_plate', '/ui/whetstorm/items/ivory_copper_armor_plate.webp'],
  ['onyx_gold_armor_plate', '/ui/whetstorm/items/onyx_gold_armor_plate.webp'],
]);

export function mechChromaLegacyPlatesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
