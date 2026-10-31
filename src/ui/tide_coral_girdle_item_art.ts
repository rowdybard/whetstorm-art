// Original Whetstorm paintings for all Coral-Encrusted Girdle hoard tiers.
const ART: ReadonlyMap<string, string> = new Map([
  ['rare_coral_encrusted_girdle', '/ui/whetstorm/items/rare_coral_encrusted_girdle.webp'],
  ['coral_encrusted_girdle', '/ui/whetstorm/items/coral_encrusted_girdle.webp'],
  ['legendary_coral_encrusted_girdle', '/ui/whetstorm/items/legendary_coral_encrusted_girdle.webp'],
]);
export function tideCoralGirdleItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
