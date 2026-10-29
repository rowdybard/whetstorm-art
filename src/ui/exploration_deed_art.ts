// Original paintings for exploration deeds.
const EXPLORATION_DEED_ART = new Map<string, string>([
  ['exp_something_shiny', '/ui/whetstorm/deeds/exp_something_shiny.webp'],
  ['exp_vale_wayfarer', '/ui/whetstorm/deeds/exp_vale_wayfarer.webp'],
  ['exp_marsh_wayfarer', '/ui/whetstorm/deeds/exp_marsh_wayfarer.webp'],
  ['exp_peaks_wayfarer', '/ui/whetstorm/deeds/exp_peaks_wayfarer.webp'],
]);

export function explorationDeedImageUrl(id: string): string | null {
  return EXPLORATION_DEED_ART.get(id) ?? null;
}
