// Individually painted later-tier heroic vendor and world quest jewelry.
const JEWELRY_BATCH_LATER_TIER = new Map<string, string>([
  ['seal_of_the_nine_oaths', '/ui/whetstorm/items/seal_of_the_nine_oaths.webp'],
  ['nielas_coldlight_band', '/ui/whetstorm/items/nielas_coldlight_band.webp'],
  ['sutils_gambit', '/ui/whetstorm/items/sutils_gambit.webp'],
  ['oath_of_the_round_table', '/ui/whetstorm/items/oath_of_the_round_table.webp'],
]);

export function jewelryBatchLaterTierItemImageUrl(id: string): string | null {
  return JEWELRY_BATCH_LATER_TIER.get(id) ?? null;
}
