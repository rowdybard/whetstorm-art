// Original paintings for the Shadowpulse cloth armor.
const SHADOWPULSE_ITEM_ART = new Map<string, string>([
  ['shadowpulse_handwraps', '/ui/whetstorm/items/shadowpulse_handwraps.webp'],
  ['shadowpulse_slippers', '/ui/whetstorm/items/shadowpulse_slippers.webp'],
]);

export function shadowpulseItemImageUrl(id: string): string | null {
  return SHADOWPULSE_ITEM_ART.get(id) ?? null;
}
