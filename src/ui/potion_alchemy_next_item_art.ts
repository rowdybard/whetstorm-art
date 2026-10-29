// Original paintings for early alchemy products.
const ART = new Map<string, string>([
  ['silverleaf_healing_draught', '/ui/whetstorm/items/silverleaf_healing_draught.webp'],
  ['silverleaf_mana_draught', '/ui/whetstorm/items/silverleaf_mana_draught.webp'],
  ['elixir_of_the_boar', '/ui/whetstorm/items/elixir_of_the_boar.webp'],
  ['goldleaf_healing_draught', '/ui/whetstorm/items/goldleaf_healing_draught.webp'],
]);

export function potionAlchemyNextItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
