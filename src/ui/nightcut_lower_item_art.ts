// Original Nightcut Season 2 lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_rogue_assassination_legs', '/ui/whetstorm/items/vanguard_rogue_assassination_legs.webp'],
  ['vanguard_rogue_assassination_gloves', '/ui/whetstorm/items/vanguard_rogue_assassination_gloves.webp'],
]);

export function nightcutLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
