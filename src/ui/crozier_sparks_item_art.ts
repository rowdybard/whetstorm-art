// Original paintings for two caster weapons.
const CROZIER_SPARKS_ITEM_ART = new Map<string, string>([
  ['springtouched_crozier', '/ui/whetstorm/items/springtouched_crozier.webp'],
  ['wand_of_quenched_sparks', '/ui/whetstorm/items/wand_of_quenched_sparks.webp'],
]);

export function crozierSparksItemImageUrl(id: string): string | null {
  return CROZIER_SPARKS_ITEM_ART.get(id) ?? null;
}
