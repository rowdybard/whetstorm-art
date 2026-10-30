// Original recipe scroll paintings in a closed map.
const ART = new Map<string, string>([
  ['recipe_potion_of_invisibility', '/ui/whetstorm/items/recipe_potion_of_invisibility.webp'],
  [
    'recipe_elixir_of_mana_regeneration',
    '/ui/whetstorm/items/recipe_elixir_of_mana_regeneration.webp',
  ],
  ['pattern_highwatch_gourd_soup', '/ui/whetstorm/items/pattern_highwatch_gourd_soup.webp'],
  [
    'pattern_highwatch_barley_porridge',
    '/ui/whetstorm/items/pattern_highwatch_barley_porridge.webp',
  ],
]);

export function recipeScrollBatchItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
