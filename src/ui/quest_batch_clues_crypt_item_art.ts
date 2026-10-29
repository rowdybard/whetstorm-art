// Original paintings for clue hunts and crypt quest rewards.
const QUEST_BATCH_CLUES_CRYPT = new Map<string, string>([
  ['clue_scroll', '/ui/whetstorm/items/clue_scroll.webp'],
  ['treasure_casket', '/ui/whetstorm/items/treasure_casket.webp'],
  ['captains_crest', '/ui/whetstorm/items/captains_crest.webp'],
  ['priests_sigil', '/ui/whetstorm/items/priests_sigil.webp'],
]);

export function questBatchCluesCryptItemImageUrl(id: string): string | null {
  return QUEST_BATCH_CLUES_CRYPT.get(id) ?? null;
}
