// Original paintings for crafting progression.
const CRAFT_MASTERY_DEED_ART = new Map<string, string>([
  ['prog_first_craft', '/ui/whetstorm/deeds/prog_first_craft.webp'],
  ['prog_craft_specialist', '/ui/whetstorm/deeds/prog_craft_specialist.webp'],
  ['prog_around_the_ring', '/ui/whetstorm/deeds/prog_around_the_ring.webp'],
]);

export function craftMasteryDeedImageUrl(id: string): string | null {
  return CRAFT_MASTERY_DEED_ART.get(id) ?? null;
}
