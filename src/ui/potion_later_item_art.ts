// Original paintings for later crafted elixirs and faction potions.
const ART = new Map<string, string>([
  ['elixir_of_the_serpent', '/ui/whetstorm/items/elixir_of_the_serpent.webp'],
  ['potion_of_invisibility', '/ui/whetstorm/items/potion_of_invisibility.webp'],
  ['elixir_of_mana_regeneration', '/ui/whetstorm/items/elixir_of_mana_regeneration.webp'],
]);

export function potionLaterItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
