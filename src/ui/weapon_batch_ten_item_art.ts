// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_TEN_ITEM_ART = new Map<string, string>([
  ['gorraks_cleaver', '/ui/whetstorm/items/gorraks_cleaver.webp'],
  ['maldrecs_soulbinder', '/ui/whetstorm/items/maldrecs_soulbinder.webp'],
  ['eastbrook_arming_sword', '/ui/whetstorm/items/eastbrook_arming_sword.webp'],
  ['copper_bearded_axe', '/ui/whetstorm/items/copper_bearded_axe.webp'],
]);

export function weaponBatchTenItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_TEN_ITEM_ART.get(id) ?? null;
}
