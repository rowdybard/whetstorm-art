// Original Whetstorm jewelry paintings for live crafted and faction items.
const JEWELRY_FACTION_CRAFT = new Map<string, string>([
  ['burnished_thorium_amulet', '/ui/whetstorm/items/burnished_thorium_amulet.webp'],
  ['acolytes_signet', '/ui/whetstorm/items/acolytes_signet.webp'],
  ['cogwork_choker', '/ui/whetstorm/items/cogwork_choker.webp'],
  ['automaton_cog_ring', '/ui/whetstorm/items/automaton_cog_ring.webp'],
]);

export function jewelryFactionCraftItemImageUrl(id: string): string | null {
  return JEWELRY_FACTION_CRAFT.get(id) ?? null;
}
