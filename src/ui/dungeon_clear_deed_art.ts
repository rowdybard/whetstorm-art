// Original paintings for dungeon clear deeds.
const DUNGEON_CLEAR_DEED_ART = new Map<string, string>([
  ['dgn_hollow_crypt', '/ui/whetstorm/deeds/dgn_hollow_crypt.webp'],
  ['dgn_sunken_bastion', '/ui/whetstorm/deeds/dgn_sunken_bastion.webp'],
  ['dgn_drowned_temple', '/ui/whetstorm/deeds/dgn_drowned_temple.webp'],
]);

export function dungeonClearDeedImageUrl(id: string): string | null {
  return DUNGEON_CLEAR_DEED_ART.get(id) ?? null;
}
