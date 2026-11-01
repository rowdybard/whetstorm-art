// Original Season 2 Tempestwrit upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_shaman_elemental_helmet', '/ui/whetstorm/items/vanguard_shaman_elemental_helmet.webp'],
  ['vanguard_shaman_elemental_shoulder', '/ui/whetstorm/items/vanguard_shaman_elemental_shoulder.webp'],
  ['vanguard_shaman_elemental_chest', '/ui/whetstorm/items/vanguard_shaman_elemental_chest.webp'],
]);

export function tempestwritUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
