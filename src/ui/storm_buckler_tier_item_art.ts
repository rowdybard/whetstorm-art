// Original Whetstorm paintings for Tarnished and Sovereign Storm-Tuned Bucklers.
const ART: ReadonlyMap<string, string> = new Map([
  ['rare_storm_tuned_buckler', '/ui/whetstorm/items/rare_storm_tuned_buckler.webp'],
  ['legendary_storm_tuned_buckler', '/ui/whetstorm/items/legendary_storm_tuned_buckler.webp'],
]);
export function stormBucklerTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
