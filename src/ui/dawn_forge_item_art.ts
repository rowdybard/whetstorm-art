// Original paintings for two faction weapons.
const DAWN_FORGE_ITEM_ART = new Map<string, string>([
  ['dawnkeeper_consecrated_mace', '/ui/whetstorm/items/dawnkeeper_consecrated_mace.webp'],
  ['forgemaster_crag_cleaver', '/ui/whetstorm/items/forgemaster_crag_cleaver.webp'],
]);

export function dawnForgeItemImageUrl(id: string): string | null {
  return DAWN_FORGE_ITEM_ART.get(id) ?? null;
}
