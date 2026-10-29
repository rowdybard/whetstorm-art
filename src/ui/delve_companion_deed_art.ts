// Original paintings for delve companion deeds.
const DELVE_COMPANION_DEED_ART = new Map<string, string>([
  ['dlv_companion_max', '/ui/whetstorm/deeds/dlv_companion_max.webp'],
  ['dlv_companions_both', '/ui/whetstorm/deeds/dlv_companions_both.webp'],
  ['dlv_solo_heroic', '/ui/whetstorm/deeds/dlv_solo_heroic.webp'],
]);

export function delveCompanionDeedImageUrl(id: string): string | null {
  return DELVE_COMPANION_DEED_ART.get(id) ?? null;
}
