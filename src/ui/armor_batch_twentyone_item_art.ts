// Original paintings for rare Sunken Bastion armor.
const ARMOR_BATCH_TWENTYONE_ITEM_ART = new Map<string, string>([
  ['drowned_prayer_leggings', '/ui/whetstorm/items/drowned_prayer_leggings.webp'],
  ['drowned_prayer_sandals', '/ui/whetstorm/items/drowned_prayer_sandals.webp'],
  ['eelscale_leggings', '/ui/whetstorm/items/eelscale_leggings.webp'],
  ['eelscale_treads', '/ui/whetstorm/items/eelscale_treads.webp'],
]);

export function armorBatchTwentyoneItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_TWENTYONE_ITEM_ART.get(id) ?? null;
}
