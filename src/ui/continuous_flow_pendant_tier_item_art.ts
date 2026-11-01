// Original Whetstorm paintings for the Tarnished and Sovereign flow pendants.
const ART: ReadonlyMap<string, string> = new Map([
  ['rare_pendant_continuous_flow', '/ui/whetstorm/items/rare_pendant_continuous_flow.webp'],
  [
    'legendary_pendant_continuous_flow',
    '/ui/whetstorm/items/legendary_pendant_continuous_flow.webp',
  ],
]);

export function continuousFlowPendantTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
