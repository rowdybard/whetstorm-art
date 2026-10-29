// Original paintings for four early gathering deeds. The integration owner must
// connect this lookup to both game and guide and remove superseded shipping art.
const EARLY_DEED_ART = new Map<string, string>([
  ['exp_first_ore', '/ui/whetstorm/deeds/exp_first_ore.webp'],
  ['exp_first_timber', '/ui/whetstorm/deeds/exp_first_timber.webp'],
  ['exp_first_herb', '/ui/whetstorm/deeds/exp_first_herb.webp'],
  ['chr_vale_first_cast', '/ui/whetstorm/deeds/chr_vale_first_cast.webp'],
]);

export function earlyDeedImageUrl(id: string): string | null {
  return EARLY_DEED_ART.get(id) ?? null;
}
