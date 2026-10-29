// Original paintings for delve discovery deeds.
const DELVE_DISCOVERY_DEED_ART = new Map<string, string>([
  ['dlv_reliquary', '/ui/whetstorm/deeds/dlv_reliquary.webp'],
  ['dlv_litany', '/ui/whetstorm/deeds/dlv_litany.webp'],
  ['dlv_lore_journal', '/ui/whetstorm/deeds/dlv_lore_journal.webp'],
]);

export function delveDiscoveryDeedImageUrl(id: string): string | null {
  return DELVE_DISCOVERY_DEED_ART.get(id) ?? null;
}
