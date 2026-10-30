// Original Whetstorm profession archetype paintings.
const ART: ReadonlyMap<string, string> = new Map([
  ['archetype_arcanist', '/ui/whetstorm/professions/archetype_arcanist.webp'],
  ['archetype_bladewright', '/ui/whetstorm/professions/archetype_bladewright.webp'],
  ['archetype_outfitter', '/ui/whetstorm/professions/archetype_outfitter.webp'],
  ['archetype_mageweaver', '/ui/whetstorm/professions/archetype_mageweaver.webp'],
]);

export function whetstormArchetypeBImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
