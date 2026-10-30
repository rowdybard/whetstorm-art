// Original paintings for Palmreach and fishing milestones.
const ART = new Map<string, string>([
  ['chr_palmreach_first_cast', '/ui/whetstorm/deeds/chr_palmreach_first_cast.webp'],
  ['chr_palmreach_gatherer', '/ui/whetstorm/deeds/chr_palmreach_gatherer.webp'],
  ['prog_master_angler', '/ui/whetstorm/deeds/prog_master_angler.webp'],
  ['col_deepest_cast', '/ui/whetstorm/deeds/col_deepest_cast.webp'],
]);

export function palmreachFishingDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
