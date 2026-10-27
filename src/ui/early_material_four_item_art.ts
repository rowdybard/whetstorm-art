// Individual early-world material paintings in a closed item map.
const EARLY_MATERIAL_ART = new Map<string, string>([
  ['mudfin_scale', '/ui/whetstorm/items/mudfin_scale.webp'],
  ['linen_scrap', '/ui/whetstorm/items/linen_scrap.webp'],
  ['tallow_candle', '/ui/whetstorm/items/tallow_candle.webp'],
  ['bone_fragments', '/ui/whetstorm/items/bone_fragments.webp'],
]);

export function earlyMaterialFourItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_ART.get(id) ?? null;
}
