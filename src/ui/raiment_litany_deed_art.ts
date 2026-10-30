// Original paintings for armor collection and Litany delve deeds.
const RAIMENT_LITANY_DEED_ART = new Map<string, string>([
  ['col_set_soulflame', '/ui/whetstorm/deeds/col_set_soulflame.webp'],
  ['col_set_stormcallers', '/ui/whetstorm/deeds/col_set_stormcallers.webp'],
  ['dlv_litany_heroic', '/ui/whetstorm/deeds/dlv_litany_heroic.webp'],
  ['dlv_varric_ringers', '/ui/whetstorm/deeds/dlv_varric_ringers.webp'],
]);

export function raimentLitanyDeedImageUrl(id: string): string | null {
  return RAIMENT_LITANY_DEED_ART.get(id) ?? null;
}
