// Original early profession material paintings in a closed map.
const EARLY_MATERIAL_FIFTEEN_ART = new Map<string, string>([
  ['fine_copper_ore', '/ui/whetstorm/items/fine_copper_ore.webp'],
  ['fine_ironbark_log', '/ui/whetstorm/items/fine_ironbark_log.webp'],
  ['fine_silverleaf_herb', '/ui/whetstorm/items/fine_silverleaf_herb.webp'],
  ['withered_husks', '/ui/whetstorm/items/withered_husks.webp'],
]);

export function earlyMaterialFifteenItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_FIFTEEN_ART.get(id) ?? null;
}
