// Original crests for crafting skill milestones.
const ART: ReadonlyMap<string, string> = new Map([
  ['prog_leatherworking_50', '/ui/whetstorm/deeds/prog_leatherworking_50.webp'],
  ['prog_tailoring_50', '/ui/whetstorm/deeds/prog_tailoring_50.webp'],
  ['prog_enchanting_50', '/ui/whetstorm/deeds/prog_enchanting_50.webp'],
  ['prog_weaponcrafting_50', '/ui/whetstorm/deeds/prog_weaponcrafting_50.webp'],
]);

export function craftSkillsDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
