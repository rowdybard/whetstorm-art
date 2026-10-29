// Original Slagbreaker mail set paintings.
const SLAGBREAKER_ARMOR_ITEM_ART = new Map<string, string>([
  ['slagbreaker_helmet', '/ui/whetstorm/items/slagbreaker_helmet.webp'],
  ['slagbreaker_shoulder', '/ui/whetstorm/items/slagbreaker_shoulder.webp'],
  ['slagbreaker_chest', '/ui/whetstorm/items/slagbreaker_chest.webp'],
  ['slagbreaker_gloves', '/ui/whetstorm/items/slagbreaker_gloves.webp'],
]);

export function slagbreakerArmorItemImageUrl(id: string): string | null {
  return SLAGBREAKER_ARMOR_ITEM_ART.get(id) ?? null;
}
