// Original paintings for Nythraxis jewelcraft designs.
const ART = new Map<string, string>([
  ['pattern_wyrmfall_pendant', '/ui/whetstorm/items/pattern_wyrmfall_pendant.webp'],
  ['pattern_warhewn_signet', '/ui/whetstorm/items/pattern_warhewn_signet.webp'],
  ['pattern_prismglass_loop', '/ui/whetstorm/items/pattern_prismglass_loop.webp'],
]);

export function nythraxisJewelPatternItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
