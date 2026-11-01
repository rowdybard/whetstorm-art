// Original Duskhymn upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_priest_shadow_helmet', '/ui/whetstorm/items/vanguard_priest_shadow_helmet.webp'],
  ['vanguard_priest_shadow_shoulder', '/ui/whetstorm/items/vanguard_priest_shadow_shoulder.webp'],
  ['vanguard_priest_shadow_chest', '/ui/whetstorm/items/vanguard_priest_shadow_chest.webp'],
]);

export function vanguardDuskhymnUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
