// Original Dawnforged mail set paintings.
const DAWNFORGED_ARMOR_ITEM_ART = new Map<string, string>([
  ['dawnforged_helmet', '/ui/whetstorm/items/dawnforged_helmet.webp'],
  ['dawnforged_shoulder', '/ui/whetstorm/items/dawnforged_shoulder.webp'],
  ['dawnforged_chest', '/ui/whetstorm/items/dawnforged_chest.webp'],
  ['dawnforged_gloves', '/ui/whetstorm/items/dawnforged_gloves.webp'],
  ['dawnforged_legs', '/ui/whetstorm/items/dawnforged_legs.webp'],
]);

export function dawnforgedArmorItemImageUrl(id: string): string | null {
  return DAWNFORGED_ARMOR_ITEM_ART.get(id) ?? null;
}
