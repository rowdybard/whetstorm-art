// Original paintings for collection milestones.
const ART = new Map<string, string>([
  ['col_reliquary_illum_nythraxis_heroic', '/ui/whetstorm/deeds/col_reliquary_illum_nythraxis_heroic.webp'],
  ['col_reliquary_illum_thunzharr', '/ui/whetstorm/deeds/col_reliquary_illum_thunzharr.webp'],
  ['col_reliquary_illum_gravewyrm_heroic', '/ui/whetstorm/deeds/col_reliquary_illum_gravewyrm_heroic.webp'],
  ['col_quartermaster_buyout', '/ui/whetstorm/deeds/col_quartermaster_buyout.webp'],
  ['col_reliquary_conquerors', '/ui/whetstorm/deeds/col_reliquary_conquerors.webp'],
]);

export function collectionMilestoneDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
