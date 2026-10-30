// Original Whetstorm paintings for five profession archetypes.
const ARCHETYPE_A_ART: ReadonlyMap<string, string> = new Map([
  ['archetype_apothecary', '/ui/whetstorm/professions/archetype_apothecary.webp'],
  ['archetype_cogsmith', '/ui/whetstorm/professions/archetype_cogsmith.webp'],
  ['archetype_trapper', '/ui/whetstorm/professions/archetype_trapper.webp'],
  ['archetype_gembinder', '/ui/whetstorm/professions/archetype_gembinder.webp'],
  ['archetype_bombardier', '/ui/whetstorm/professions/archetype_bombardier.webp'],
]);

export function whetstormArchetypeAImageUrl(id: string): string | null {
  return ARCHETYPE_A_ART.get(id) ?? null;
}
