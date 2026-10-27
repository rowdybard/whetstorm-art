// Original paintings for four early-zone armor items.
const ARMOR_BATCH_ELEVEN_ITEM_ART = new Map<string, string>([
  ['fenbridge_hide_boots', '/ui/whetstorm/items/fenbridge_hide_boots.webp'],
  ['goldweave_robe', '/ui/whetstorm/items/goldweave_robe.webp'],
  ['goldweave_leggings', '/ui/whetstorm/items/goldweave_leggings.webp'],
  ['marshstalker_hood', '/ui/whetstorm/items/marshstalker_hood.webp'],
]);

export function armorBatchElevenItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_ELEVEN_ITEM_ART.get(id) ?? null;
}
