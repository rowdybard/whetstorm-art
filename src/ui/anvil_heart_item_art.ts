// Original paintings for two Crucible blades.
const ANVIL_HEART_ITEM_ART = new Map<string, string>([
  ['anvilguard_blade', '/ui/whetstorm/items/anvilguard_blade.webp'],
  ['heart_of_the_end_greatblade', '/ui/whetstorm/items/heart_of_the_end_greatblade.webp'],
]);

export function anvilHeartItemImageUrl(id: string): string | null {
  return ANVIL_HEART_ITEM_ART.get(id) ?? null;
}
