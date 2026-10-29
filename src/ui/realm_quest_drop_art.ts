// Original paintings for carried quest drops in the realm.
const REALM_QUEST_DROP_ART = new Map<string, string>([
  ['wardens_seal', '/ui/whetstorm/items/wardens_seal.webp'],
  ['duskwisp_essence', '/ui/whetstorm/items/duskwisp_essence.webp'],
  ['spore_heart', '/ui/whetstorm/items/spore_heart.webp'],
  ['wisp_mote', '/ui/whetstorm/items/wisp_mote.webp'],
]);

export function realmQuestDropItemImageUrl(id: string): string | null {
  return REALM_QUEST_DROP_ART.get(id) ?? null;
}
