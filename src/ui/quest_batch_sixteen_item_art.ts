// Original paintings for four early marsh quest items.
const QUEST_BATCH_SIXTEEN_ITEM_ART = new Map<string, string>([
  ['fen_muster_order', '/ui/whetstorm/items/fen_muster_order.webp'],
  ['lost_caravan_goods', '/ui/whetstorm/items/lost_caravan_goods.webp'],
  ['rusted_censer', '/ui/whetstorm/items/rusted_censer.webp'],
  ['bastion_ward_stone', '/ui/whetstorm/items/bastion_ward_stone.webp'],
]);

export function questBatchSixteenItemImageUrl(id: string): string | null {
  return QUEST_BATCH_SIXTEEN_ITEM_ART.get(id) ?? null;
}
