// Original Zealfire mail set paintings.
const ZEALFIRE_ARMOR_ITEM_ART = new Map<string, string>([
  ['zealfire_helmet', '/ui/whetstorm/items/zealfire_helmet.webp'],
  ['zealfire_shoulder', '/ui/whetstorm/items/zealfire_shoulder.webp'],
  ['zealfire_chest', '/ui/whetstorm/items/zealfire_chest.webp'],
  ['zealfire_gloves', '/ui/whetstorm/items/zealfire_gloves.webp'],
  ['zealfire_legs', '/ui/whetstorm/items/zealfire_legs.webp'],
]);

export function zealfireArmorItemImageUrl(id: string): string | null {
  return ZEALFIRE_ARMOR_ITEM_ART.get(id) ?? null;
}
