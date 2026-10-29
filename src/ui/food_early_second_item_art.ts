// Original early cooking paintings in a closed map.
const FOOD_EARLY_SECOND_ART = new Map<string, string>([
  ['vale_hearth_loaf', '/ui/whetstorm/items/vale_hearth_loaf.webp'],
  ['eastbrook_root_pottage', '/ui/whetstorm/items/eastbrook_root_pottage.webp'],
  ['eastbrook_glazed_carrots', '/ui/whetstorm/items/eastbrook_glazed_carrots.webp'],
  ['fenbridge_rice_bowl', '/ui/whetstorm/items/fenbridge_rice_bowl.webp'],
]);

export function foodEarlySecondItemImageUrl(id: string): string | null {
  return FOOD_EARLY_SECOND_ART.get(id) ?? null;
}
