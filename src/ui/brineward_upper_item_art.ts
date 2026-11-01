// Original Season 2 Brineward upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_shaman_restoration_helmet', '/ui/whetstorm/items/vanguard_shaman_restoration_helmet.webp'],
  ['vanguard_shaman_restoration_shoulder', '/ui/whetstorm/items/vanguard_shaman_restoration_shoulder.webp'],
  ['vanguard_shaman_restoration_chest', '/ui/whetstorm/items/vanguard_shaman_restoration_chest.webp'],
]);

export function brinewardUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
