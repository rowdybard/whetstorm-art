// Original paintings for trainer-taught alchemy products.
const ART = new Map<string, string>([
  ['goldleaf_mana_draught', '/ui/whetstorm/items/goldleaf_mana_draught.webp'],
  ['venomfire_elixir', '/ui/whetstorm/items/venomfire_elixir.webp'],
  ['sunpetal_healing_draught', '/ui/whetstorm/items/sunpetal_healing_draught.webp'],
  ['sunpetal_mana_draught', '/ui/whetstorm/items/sunpetal_mana_draught.webp'],
]);

export function alchemyBottlesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
