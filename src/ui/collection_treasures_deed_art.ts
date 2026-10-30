// Original paintings for collection discoveries and first quality milestones.
const COLLECTION_TREASURES_DEED_ART = new Map<string, string>([
  ['col_discovery_150', '/ui/whetstorm/deeds/col_discovery_150.webp'],
  ['col_discovery_250', '/ui/whetstorm/deeds/col_discovery_250.webp'],
  ['col_first_epic', '/ui/whetstorm/deeds/col_first_epic.webp'],
  ['col_first_legendary', '/ui/whetstorm/deeds/col_first_legendary.webp'],
]);

export function collectionTreasuresDeedImageUrl(id: string): string | null {
  return COLLECTION_TREASURES_DEED_ART.get(id) ?? null;
}
