// Original Thistlebloom Season 2 lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_druid_restoration_legs', '/ui/whetstorm/items/vanguard_druid_restoration_legs.webp'],
  ['vanguard_druid_restoration_gloves', '/ui/whetstorm/items/vanguard_druid_restoration_gloves.webp'],
]);

export function thistlebloomLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
