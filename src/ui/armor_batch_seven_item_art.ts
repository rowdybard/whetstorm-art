// Original paintings for four early-zone armor items.
const ARMOR_BATCH_SEVEN_ITEM_ART = new Map<string, string>([
  ['eastbrook_chain_vest', '/ui/whetstorm/items/eastbrook_chain_vest.webp'],
  ['valespun_robe', '/ui/whetstorm/items/valespun_robe.webp'],
  ['tanned_leather_jerkin', '/ui/whetstorm/items/tanned_leather_jerkin.webp'],
  ['hobnail_boots', '/ui/whetstorm/items/hobnail_boots.webp'],
]);

export function armorBatchSevenItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_SEVEN_ITEM_ART.get(id) ?? null;
}
