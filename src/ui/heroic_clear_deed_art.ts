// Original paintings for heroic dungeon clear deeds.
const HEROIC_CLEAR_DEED_ART = new Map<string, string>([
  ['dgn_hollow_crypt_heroic', '/ui/whetstorm/deeds/dgn_hollow_crypt_heroic.webp'],
  ['dgn_sunken_bastion_heroic', '/ui/whetstorm/deeds/dgn_sunken_bastion_heroic.webp'],
  ['dgn_drowned_temple_heroic', '/ui/whetstorm/deeds/dgn_drowned_temple_heroic.webp'],
]);

export function heroicClearDeedImageUrl(id: string): string | null {
  return HEROIC_CLEAR_DEED_ART.get(id) ?? null;
}
