// Original Whetstorm crafting profession paintings, keyed by exact identity.
const CRAFTING_B_PROFESSION_ART: ReadonlyMap<string, string> = new Map([
  ['prof_inscription', '/ui/whetstorm/professions/prof_inscription.webp'],
  ['prof_jewelcrafting', '/ui/whetstorm/professions/prof_jewelcrafting.webp'],
  ['prof_leatherworking', '/ui/whetstorm/professions/prof_leatherworking.webp'],
  ['prof_tailoring', '/ui/whetstorm/professions/prof_tailoring.webp'],
  ['prof_weaponcrafting', '/ui/whetstorm/professions/prof_weaponcrafting.webp'],
]);

export function whetstormCraftingBProfessionImageUrl(id: string): string | null {
  return CRAFTING_B_PROFESSION_ART.get(id) ?? null;
}
