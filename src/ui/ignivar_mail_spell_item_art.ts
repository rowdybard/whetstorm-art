// Original paintings for the Crucible mail spell offset pieces.
const ART = new Map<string, string>([
  ['stormkindled_chain', '/ui/whetstorm/items/stormkindled_chain.webp'],
  ['thundershock_treads', '/ui/whetstorm/items/thundershock_treads.webp'],
]);

export function ignivarMailSpellItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
