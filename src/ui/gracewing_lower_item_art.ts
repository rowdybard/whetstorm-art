// Original Gracewing lower equipment paintings.
const ART = new Map<string, string>([
  ['vanguard_priest_holy_legs', '/ui/whetstorm/items/vanguard_priest_holy_legs.webp'],
  ['vanguard_priest_holy_gloves', '/ui/whetstorm/items/vanguard_priest_holy_gloves.webp'],
]);

export function gracewingLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
