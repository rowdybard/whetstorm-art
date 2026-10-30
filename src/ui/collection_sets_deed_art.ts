// Original paintings for collectible armor sets.
const COLLECTION_SETS_DEED_ART = new Map<string, string>([
  ['col_set_vale_arcanist', '/ui/whetstorm/deeds/col_set_vale_arcanist.webp'],
  ['col_set_boundstone_vanguard', '/ui/whetstorm/deeds/col_set_boundstone_vanguard.webp'],
  ['col_set_greyjaw_stalker', '/ui/whetstorm/deeds/col_set_greyjaw_stalker.webp'],
  ['col_set_deathlord', '/ui/whetstorm/deeds/col_set_deathlord.webp'],
]);

export function collectionSetsDeedImageUrl(id: string): string | null {
  return COLLECTION_SETS_DEED_ART.get(id) ?? null;
}
