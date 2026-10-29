// Original paintings for dungeon meta deeds.
const DUNGEON_META_DEED_ART = new Map<string, string>([
  ['dgn_deepward', '/ui/whetstorm/deeds/dgn_deepward.webp'],
  ['dgn_mark_circuit', '/ui/whetstorm/deeds/dgn_mark_circuit.webp'],
  ['dgn_boss_clears_50', '/ui/whetstorm/deeds/dgn_boss_clears_50.webp'],
]);

export function dungeonMetaDeedImageUrl(id: string): string | null {
  return DUNGEON_META_DEED_ART.get(id) ?? null;
}
