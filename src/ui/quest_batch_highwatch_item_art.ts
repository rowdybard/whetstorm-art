// Original paintings for four Highwatch quest items.
const QUEST_BATCH_HIGHWATCH_ITEM_ART = new Map<string, string>([
  ['highwatch_summons', '/ui/whetstorm/items/highwatch_summons.webp'],
  ['glowing_wax', '/ui/whetstorm/items/glowing_wax.webp'],
  ['storm_core', '/ui/whetstorm/items/storm_core.webp'],
  ['kazzix_heartshard', '/ui/whetstorm/items/kazzix_heartshard.webp'],
]);

export function questBatchHighwatchItemImageUrl(id: string): string | null {
  return QUEST_BATCH_HIGHWATCH_ITEM_ART.get(id) ?? null;
}
