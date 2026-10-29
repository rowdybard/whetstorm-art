// Original paintings for four Thornpeak quest items.
const QUEST_THORNPEAK_ITEM_ART = new Map<string, string>([
  ['gravewyrm_sigil', '/ui/whetstorm/items/gravewyrm_sigil.webp'],
  ['sanctum_key_shard', '/ui/whetstorm/items/sanctum_key_shard.webp'],
  ['runed_bone_shard', '/ui/whetstorm/items/runed_bone_shard.webp'],
  ['royal_seal', '/ui/whetstorm/items/royal_seal.webp'],
]);

export function questThornpeakItemImageUrl(id: string): string | null {
  return QUEST_THORNPEAK_ITEM_ART.get(id) ?? null;
}
