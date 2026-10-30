// Original paintings for early collection achievements.
const EARLY_COLLECTION_DEED_ART = new Map<string, string>([
  ['col_discovery_25', '/ui/whetstorm/deeds/col_discovery_25.webp'],
  ['col_discovery_75', '/ui/whetstorm/deeds/col_discovery_75.webp'],
  ['col_first_rare', '/ui/whetstorm/deeds/col_first_rare.webp'],
  ['col_all_slots', '/ui/whetstorm/deeds/col_all_slots.webp'],
]);

export function earlyCollectionDeedImageUrl(id: string): string | null {
  return EARLY_COLLECTION_DEED_ART.get(id) ?? null;
}
