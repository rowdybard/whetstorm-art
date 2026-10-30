// Original paintings for civic, coin, and bank milestones.
const CIVIC_BANK_DEED_ART = new Map<string, string>([
  ['soc_heavy_purse', '/ui/whetstorm/deeds/soc_heavy_purse.webp'],
  ['soc_civic_duty', '/ui/whetstorm/deeds/soc_civic_duty.webp'],
  ['soc_strongbox_outfitter', '/ui/whetstorm/deeds/soc_strongbox_outfitter.webp'],
  ['soc_four_bags_deep', '/ui/whetstorm/deeds/soc_four_bags_deep.webp'],
]);

export function civicBankDeedImageUrl(id: string): string | null {
  return CIVIC_BANK_DEED_ART.get(id) ?? null;
}
