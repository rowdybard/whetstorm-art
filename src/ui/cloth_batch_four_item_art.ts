// Original paintings for obtainable cloth armor.
const CLOTH_BATCH_FOUR_ITEM_ART = new Map<string, string>([
  ['litany_legs', '/ui/whetstorm/items/litany_legs.webp'],
  ['litany_cloth_chest', '/ui/whetstorm/items/litany_cloth_chest.webp'],
  ['litany_helm', '/ui/whetstorm/items/litany_helm.webp'],
  ['tidewatchers_wraps', '/ui/whetstorm/items/tidewatchers_wraps.webp'],
]);

export function clothBatchFourItemImageUrl(id: string): string | null {
  return CLOTH_BATCH_FOUR_ITEM_ART.get(id) ?? null;
}
