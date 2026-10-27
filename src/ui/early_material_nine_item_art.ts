// Original early gathering and crafting item paintings in a closed map.
const EARLY_MATERIAL_NINE_ART = new Map<string, string>([
  ['ironbark_log', '/ui/whetstorm/items/ironbark_log.webp'],
  ['iron_ore', '/ui/whetstorm/items/iron_ore.webp'],
  ['silverleaf_herb', '/ui/whetstorm/items/silverleaf_herb.webp'],
  ['vale_wheat_seed', '/ui/whetstorm/items/vale_wheat_seed.webp'],
]);

export function earlyMaterialNineItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_NINE_ART.get(id) ?? null;
}
