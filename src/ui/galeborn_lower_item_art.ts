// Original Season 2 Galeborn lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_shaman_enhancement_legs', '/ui/whetstorm/items/vanguard_shaman_enhancement_legs.webp'],
  ['vanguard_shaman_enhancement_gloves', '/ui/whetstorm/items/vanguard_shaman_enhancement_gloves.webp'],
]);

export function galebornLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
