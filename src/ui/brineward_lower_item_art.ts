// Original Season 2 Brineward lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_shaman_restoration_legs', '/ui/whetstorm/items/vanguard_shaman_restoration_legs.webp'],
  ['vanguard_shaman_restoration_gloves', '/ui/whetstorm/items/vanguard_shaman_restoration_gloves.webp'],
]);

export function brinewardLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
