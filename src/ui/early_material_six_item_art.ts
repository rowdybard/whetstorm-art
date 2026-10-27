// Original paintings for early-world drops and quest objects.
const EARLY_MATERIAL_SIX_ART = new Map<string, string>([
  ['valefire_lantern', '/ui/whetstorm/items/valefire_lantern.webp'],
  ['moggers_hide_quiver', '/ui/whetstorm/items/moggers_hide_quiver.webp'],
  ['lesser_healing_potion', '/ui/whetstorm/items/lesser_healing_potion.webp'],
  ['blessed_wax', '/ui/whetstorm/items/blessed_wax.webp'],
]);

export function earlyMaterialSixItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_SIX_ART.get(id) ?? null;
}
