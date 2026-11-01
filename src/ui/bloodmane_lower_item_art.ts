// Original Bloodmane Season 2 lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_druid_feral_legs', '/ui/whetstorm/items/vanguard_druid_feral_legs.webp'],
  ['vanguard_druid_feral_gloves', '/ui/whetstorm/items/vanguard_druid_feral_gloves.webp'],
]);

export function bloodmaneLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
