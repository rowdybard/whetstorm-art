// Original crests for first rare weapon and armor crafting achievements.
const ART: ReadonlyMap<string, string> = new Map([
  ['prog_weaponcrafting_rare', '/ui/whetstorm/deeds/prog_weaponcrafting_rare.webp'],
  ['prog_armorcrafting_rare', '/ui/whetstorm/deeds/prog_armorcrafting_rare.webp'],
]);

export function rareSmithingDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
