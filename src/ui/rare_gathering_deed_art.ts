// Original paintings for rare gathering discoveries.
const RARE_GATHERING_DEED_ART = new Map<string, string>([
  ['col_pristine_vein', '/ui/whetstorm/deeds/col_pristine_vein.webp'],
  ['col_ancient_heartwood', '/ui/whetstorm/deeds/col_ancient_heartwood.webp'],
  ['col_moonlit_bloom', '/ui/whetstorm/deeds/col_moonlit_bloom.webp'],
  ['col_perfect_specimen', '/ui/whetstorm/deeds/col_perfect_specimen.webp'],
]);

export function rareGatheringDeedImageUrl(id: string): string | null {
  return RARE_GATHERING_DEED_ART.get(id) ?? null;
}
