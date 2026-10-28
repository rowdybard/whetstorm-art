// Original paintings for four early marsh quest rewards.
const ARMOR_BATCH_SEVENTEEN_ITEM_ART = new Map<string, string>([
  ['drownedguard_breastplate', '/ui/whetstorm/items/drownedguard_breastplate.webp'],
  ['fenmist_robe', '/ui/whetstorm/items/fenmist_robe.webp'],
  ['eelskin_tunic', '/ui/whetstorm/items/eelskin_tunic.webp'],
  ['trollhide_leggings', '/ui/whetstorm/items/trollhide_leggings.webp'],
]);

export function armorBatchSeventeenItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_SEVENTEEN_ITEM_ART.get(id) ?? null;
}
