// Original paintings for prestige progression deeds.
const PRESTIGE_DEED_ART = new Map<string, string>([
  ['prog_prestige', '/ui/whetstorm/deeds/prog_prestige.webp'],
  ['prog_prestige_5', '/ui/whetstorm/deeds/prog_prestige_5.webp'],
  ['prog_prestige_10', '/ui/whetstorm/deeds/prog_prestige_10.webp'],
]);

export function prestigeDeedImageUrl(id: string): string | null {
  return PRESTIGE_DEED_ART.get(id) ?? null;
}
