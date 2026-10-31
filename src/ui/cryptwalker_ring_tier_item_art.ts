// Original Whetstorm paintings for Tarnished and Sovereign Cryptwalker rings.
const ART: ReadonlyMap<string, string> = new Map([
  ['rare_seal_of_the_cryptwalker', '/ui/whetstorm/items/rare_seal_of_the_cryptwalker.webp'],
  [
    'legendary_seal_of_the_cryptwalker',
    '/ui/whetstorm/items/legendary_seal_of_the_cryptwalker.webp',
  ],
]);
export function cryptwalkerRingTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
