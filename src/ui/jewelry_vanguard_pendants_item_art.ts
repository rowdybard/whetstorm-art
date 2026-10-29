// Original Vanguard pendant paintings in a closed map.
const ART = new Map<string, string>([
  ['vanguard_pendant_of_might', '/ui/whetstorm/items/vanguard_pendant_of_might.webp'],
  ['vanguard_pendant_of_precision', '/ui/whetstorm/items/vanguard_pendant_of_precision.webp'],
  ['vanguard_pendant_of_focus', '/ui/whetstorm/items/vanguard_pendant_of_focus.webp'],
  ['vanguard_pendant_of_mending', '/ui/whetstorm/items/vanguard_pendant_of_mending.webp'],
]);

export function jewelryVanguardPendantsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
