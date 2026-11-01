// Original Duskhymn lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_priest_shadow_gloves', '/ui/whetstorm/items/vanguard_priest_shadow_gloves.webp'],
  ['vanguard_priest_shadow_legs', '/ui/whetstorm/items/vanguard_priest_shadow_legs.webp'],
]);

export function vanguardDuskhymnLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
