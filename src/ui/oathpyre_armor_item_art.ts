// Original Oathpyre mail set paintings.
const OATHPYRE_ARMOR_ITEM_ART = new Map<string, string>([
  ['oathpyre_helmet', '/ui/whetstorm/items/oathpyre_helmet.webp'],
  ['oathpyre_shoulder', '/ui/whetstorm/items/oathpyre_shoulder.webp'],
  ['oathpyre_chest', '/ui/whetstorm/items/oathpyre_chest.webp'],
  ['oathpyre_gloves', '/ui/whetstorm/items/oathpyre_gloves.webp'],
  ['oathpyre_legs', '/ui/whetstorm/items/oathpyre_legs.webp'],
]);

export function oathpyreArmorItemImageUrl(id: string): string | null {
  return OATHPYRE_ARMOR_ITEM_ART.get(id) ?? null;
}
