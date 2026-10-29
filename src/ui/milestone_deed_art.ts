// Original paintings for progression milestones.
const MILESTONE_DEED_ART = new Map<string, string>([
  ['prog_the_long_middle', '/ui/whetstorm/deeds/prog_the_long_middle.webp'],
  ['prog_level_cap', '/ui/whetstorm/deeds/prog_level_cap.webp'],
  ['prog_deep_roots', '/ui/whetstorm/deeds/prog_deep_roots.webp'],
]);

export function milestoneDeedImageUrl(id: string): string | null {
  return MILESTONE_DEED_ART.get(id) ?? null;
}
