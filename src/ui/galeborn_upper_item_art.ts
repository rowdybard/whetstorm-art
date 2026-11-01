// Original Season 2 Galeborn upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_shaman_enhancement_helmet', '/ui/whetstorm/items/vanguard_shaman_enhancement_helmet.webp'],
  ['vanguard_shaman_enhancement_shoulder', '/ui/whetstorm/items/vanguard_shaman_enhancement_shoulder.webp'],
  ['vanguard_shaman_enhancement_chest', '/ui/whetstorm/items/vanguard_shaman_enhancement_chest.webp'],
]);

export function galebornUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
