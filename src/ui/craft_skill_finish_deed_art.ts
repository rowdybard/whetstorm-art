// Original crests for the remaining level-50 craft milestones.
const ART: ReadonlyMap<string, string> = new Map([
  ['prog_armorcrafting_50', '/ui/whetstorm/deeds/prog_armorcrafting_50.webp'],
  ['prog_jewelcrafting_50', '/ui/whetstorm/deeds/prog_jewelcrafting_50.webp'],
  ['prog_inscription_50', '/ui/whetstorm/deeds/prog_inscription_50.webp'],
]);

export function craftSkillFinishDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
