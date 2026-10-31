// Original paintings for the Stonehearth helm, pauldrons, and hauberk.
const ART = new Map<string, string>([
  ['stonehearth_helmet', '/ui/whetstorm/items/stonehearth_helmet.webp'],
  ['stonehearth_shoulder', '/ui/whetstorm/items/stonehearth_shoulder.webp'],
  ['stonehearth_chest', '/ui/whetstorm/items/stonehearth_chest.webp'],
]);

export function stonehearthUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
