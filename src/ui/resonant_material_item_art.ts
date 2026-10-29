// Original disenchant material paintings in a closed map.
const RESONANT_MATERIAL_ART = new Map<string, string>([
  ['resonant_steel', '/ui/whetstorm/items/resonant_steel.webp'],
  ['resonant_timber', '/ui/whetstorm/items/resonant_timber.webp'],
  ['resonant_hide', '/ui/whetstorm/items/resonant_hide.webp'],
  ['resonant_links', '/ui/whetstorm/items/resonant_links.webp'],
]);

export function resonantMaterialItemImageUrl(id: string): string | null {
  return RESONANT_MATERIAL_ART.get(id) ?? null;
}
