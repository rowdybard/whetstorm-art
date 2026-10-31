// Original Riptide Handwraps tier paintings.
const ART = new Map<string, string>([
  ['riptide_handwraps', '/ui/whetstorm/items/riptide_handwraps.webp'],
  ['rare_riptide_handwraps', '/ui/whetstorm/items/rare_riptide_handwraps.webp'],
  ['legendary_riptide_handwraps', '/ui/whetstorm/items/legendary_riptide_handwraps.webp'],
]);

export function riptideHandwrapsTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
