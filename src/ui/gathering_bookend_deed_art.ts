// Original paintings for gathering progression deeds.
const GATHERING_BOOKEND_DEED_ART = new Map<string, string>([
  ['prog_first_harvest', '/ui/whetstorm/deeds/prog_first_harvest.webp'],
  ['prog_master_gatherer', '/ui/whetstorm/deeds/prog_master_gatherer.webp'],
]);

export function gatheringBookendDeedImageUrl(id: string): string | null {
  return GATHERING_BOOKEND_DEED_ART.get(id) ?? null;
}
