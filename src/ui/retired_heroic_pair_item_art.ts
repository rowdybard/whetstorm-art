// Original paintings for two save-compatible retired heroic items.
const ART = new Map<string, string>([
  ['deathless_warguard_legmail', '/ui/whetstorm/items/deathless_warguard_legmail.webp'],
  ['soulrend_diadem', '/ui/whetstorm/items/soulrend_diadem.webp'],
]);

export function retiredHeroicPairItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
