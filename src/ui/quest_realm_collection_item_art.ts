// Original paintings for realm quest collection drops.
const QUEST_REALM_COLLECTION_ART = new Map<string, string>([
  ['gleaming_antler', '/ui/whetstorm/items/gleaming_antler.webp'],
  ['elder_bark', '/ui/whetstorm/items/elder_bark.webp'],
  ['starfall_shard', '/ui/whetstorm/items/starfall_shard.webp'],
]);

export function questRealmCollectionItemImageUrl(id: string): string | null {
  return QUEST_REALM_COLLECTION_ART.get(id) ?? null;
}
