// Original Nightcut Season 2 upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_rogue_assassination_helmet', '/ui/whetstorm/items/vanguard_rogue_assassination_helmet.webp'],
  ['vanguard_rogue_assassination_shoulder', '/ui/whetstorm/items/vanguard_rogue_assassination_shoulder.webp'],
  ['vanguard_rogue_assassination_chest', '/ui/whetstorm/items/vanguard_rogue_assassination_chest.webp'],
]);

export function nightcutUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
