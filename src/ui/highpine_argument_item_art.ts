// Original paintings for two catalog weapons.
const HIGHPINE_ARGUMENT_ITEM_ART = new Map<string, string>([
  ['elderwood_battle_staff', '/ui/whetstorm/items/elderwood_battle_staff.webp'],
  ['final_argument_greatblade', '/ui/whetstorm/items/final_argument_greatblade.webp'],
]);

export function highpineArgumentItemImageUrl(id: string): string | null {
  return HIGHPINE_ARGUMENT_ITEM_ART.get(id) ?? null;
}
