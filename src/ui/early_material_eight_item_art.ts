// Original early gathering and crafting item paintings in a closed map.
const EARLY_MATERIAL_EIGHT_ART = new Map<string, string>([
  ['game_meat', '/ui/whetstorm/items/game_meat.webp'],
  ['vale_wheat', '/ui/whetstorm/items/vale_wheat.webp'],
  ['marsh_rice', '/ui/whetstorm/items/marsh_rice.webp'],
  ['spider_silk', '/ui/whetstorm/items/spider_silk.webp'],
]);

export function earlyMaterialEightItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_EIGHT_ART.get(id) ?? null;
}
