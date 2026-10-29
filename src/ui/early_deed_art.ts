// Original paintings for early deeds, shared by game and guide.
const EARLY_DEED_ART = new Map<string, string>([
  ['exp_first_ore', '/ui/whetstorm/deeds/exp_first_ore.webp'],
  ['exp_first_timber', '/ui/whetstorm/deeds/exp_first_timber.webp'],
  ['exp_first_herb', '/ui/whetstorm/deeds/exp_first_herb.webp'],
  ['chr_vale_first_cast', '/ui/whetstorm/deeds/chr_vale_first_cast.webp'],
  ['prog_first_steps', '/ui/whetstorm/deeds/prog_first_steps.webp'],
  ['prog_finding_your_feet', '/ui/whetstorm/deeds/prog_finding_your_feet.webp'],
  ['prog_well_rested', '/ui/whetstorm/deeds/prog_well_rested.webp'],
  ['prog_double_digits', '/ui/whetstorm/deeds/prog_double_digits.webp'],
  ['prog_talented', '/ui/whetstorm/deeds/prog_talented.webp'],
  ['prog_specialized', '/ui/whetstorm/deeds/prog_specialized.webp'],
]);

export function earlyDeedImageUrl(id: string): string | null {
  return EARLY_DEED_ART.get(id) ?? null;
}
