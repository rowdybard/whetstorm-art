// Original Season 2 Lightbrand upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_paladin_retribution_helmet', '/ui/whetstorm/items/vanguard_paladin_retribution_helmet.webp'],
  ['vanguard_paladin_retribution_shoulder', '/ui/whetstorm/items/vanguard_paladin_retribution_shoulder.webp'],
  ['vanguard_paladin_retribution_chest', '/ui/whetstorm/items/vanguard_paladin_retribution_chest.webp'],
]);

export function lightbrandUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
