// Original Whetstorm crafting profession paintings, keyed by exact identity.
const CRAFTING_A_PROFESSION_ART: ReadonlyMap<string, string> = new Map([
  ['prof_alchemy', '/ui/whetstorm/professions/prof_alchemy.webp'],
  ['prof_armorcrafting', '/ui/whetstorm/professions/prof_armorcrafting.webp'],
  ['prof_cooking', '/ui/whetstorm/professions/prof_cooking.webp'],
  ['prof_enchanting', '/ui/whetstorm/professions/prof_enchanting.webp'],
  ['prof_engineering', '/ui/whetstorm/professions/prof_engineering.webp'],
]);

export function whetstormCraftingAProfessionImageUrl(id: string): string | null {
  return CRAFTING_A_PROFESSION_ART.get(id) ?? null;
}
