// Original crests for fishing and craft skill milestones.
const ART: ReadonlyMap<string, string> = new Map([
  ['prog_fishing_100', '/ui/whetstorm/deeds/prog_fishing_100.webp'],
  ['prog_alchemy_50', '/ui/whetstorm/deeds/prog_alchemy_50.webp'],
  ['prog_cooking_50', '/ui/whetstorm/deeds/prog_cooking_50.webp'],
  ['prog_engineering_50', '/ui/whetstorm/deeds/prog_engineering_50.webp'],
]);

export function tradeSkillDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
