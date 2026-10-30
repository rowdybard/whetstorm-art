// Original paintings for early chronicle and collection deeds.
const VALLEY_COLLECTION_DEED_ART = new Map<string, string>([
  ['chr_vale_rares', '/ui/whetstorm/deeds/chr_vale_rares.webp'],
  ['chr_marsh_unburst', '/ui/whetstorm/deeds/chr_marsh_unburst.webp'],
  ['col_true_colors', '/ui/whetstorm/deeds/col_true_colors.webp'],
  ['col_junk_drawer', '/ui/whetstorm/deeds/col_junk_drawer.webp'],
]);

export function valleyCollectionDeedImageUrl(id: string): string | null {
  return VALLEY_COLLECTION_DEED_ART.get(id) ?? null;
}
