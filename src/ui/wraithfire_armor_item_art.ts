// Original Wraithfire cloth set paintings.
const WRAITHFIRE_ARMOR_ITEM_ART = new Map<string, string>([
  ['soulflame_cowl', '/ui/whetstorm/items/soulflame_cowl.webp'],
  ['soulflame_mantle', '/ui/whetstorm/items/soulflame_mantle.webp'],
  ['soulflame_gloves', '/ui/whetstorm/items/soulflame_gloves.webp'],
  ['soulflame_cord', '/ui/whetstorm/items/soulflame_cord.webp'],
]);

export function wraithfireArmorItemImageUrl(id: string): string | null {
  return WRAITHFIRE_ARMOR_ITEM_ART.get(id) ?? null;
}
