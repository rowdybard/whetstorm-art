// Original paintings for lifetime experience deeds.
const EXPERIENCE_DEED_ART = new Map<string, string>([
  ['prog_veteran', '/ui/whetstorm/deeds/prog_veteran.webp'],
  ['prog_champion', '/ui/whetstorm/deeds/prog_champion.webp'],
  ['prog_paragon', '/ui/whetstorm/deeds/prog_paragon.webp'],
]);

export function experienceDeedImageUrl(id: string): string | null {
  return EXPERIENCE_DEED_ART.get(id) ?? null;
}
