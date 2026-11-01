// Original Season 2 Tempestwrit lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_shaman_elemental_legs', '/ui/whetstorm/items/vanguard_shaman_elemental_legs.webp'],
  ['vanguard_shaman_elemental_gloves', '/ui/whetstorm/items/vanguard_shaman_elemental_gloves.webp'],
]);

export function tempestwritLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
