// Original paintings for heroic depths deeds.
const HEROIC_DEPTHS_DEED_ART = new Map<string, string>([
  ['dgn_gravewyrm_sanctum_heroic', '/ui/whetstorm/deeds/dgn_gravewyrm_sanctum_heroic.webp'],
  ['dgn_nythraxis_heroic', '/ui/whetstorm/deeds/dgn_nythraxis_heroic.webp'],
  ['dlv_reliquary_heroic', '/ui/whetstorm/deeds/dlv_reliquary_heroic.webp'],
]);

export function heroicDepthsDeedImageUrl(id: string): string | null {
  return HEROIC_DEPTHS_DEED_ART.get(id) ?? null;
}
