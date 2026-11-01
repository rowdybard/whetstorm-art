// Original paintings for retired heroic armor retained for saved characters.
const ART = new Map<string, string>([
  ['scourgehide_carapace', '/ui/whetstorm/items/scourgehide_carapace.webp'],
  ['soulforged_warplate', '/ui/whetstorm/items/soulforged_warplate.webp'],
]);

export function retiredHeroicChestsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
