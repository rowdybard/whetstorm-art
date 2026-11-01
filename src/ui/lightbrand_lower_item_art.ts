// Original Season 2 Lightbrand lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_paladin_retribution_legs', '/ui/whetstorm/items/vanguard_paladin_retribution_legs.webp'],
  ['vanguard_paladin_retribution_gloves', '/ui/whetstorm/items/vanguard_paladin_retribution_gloves.webp'],
]);

export function lightbrandLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
