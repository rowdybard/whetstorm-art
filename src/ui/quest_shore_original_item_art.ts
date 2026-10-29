// Original paintings for early shore quest objects.
const QUEST_SHORE_ORIGINAL_ITEM_ART = new Map<string, string>([
  ['ps_castaway_crate', '/ui/whetstorm/items/ps_castaway_crate.webp'],
  ['ps_passing_stone', '/ui/whetstorm/items/ps_passing_stone.webp'],
  ['ps_briny_lure', '/ui/whetstorm/items/ps_briny_lure.webp'],
  ['firebottle', '/ui/whetstorm/items/firebottle.webp'],
]);

export function questShoreOriginalItemImageUrl(id: string): string | null {
  return QUEST_SHORE_ORIGINAL_ITEM_ART.get(id) ?? null;
}
