// Original Slagsnare leather set paintings.
const SLAGSNARE_ARMOR_ITEM_ART = new Map<string, string>([
  ['slagsnare_helmet', '/ui/whetstorm/items/slagsnare_helmet.webp'],
  ['slagsnare_shoulder', '/ui/whetstorm/items/slagsnare_shoulder.webp'],
  ['slagsnare_chest', '/ui/whetstorm/items/slagsnare_chest.webp'],
  ['slagsnare_gloves', '/ui/whetstorm/items/slagsnare_gloves.webp'],
  ['slagsnare_legs', '/ui/whetstorm/items/slagsnare_legs.webp'],
]);

export function slagsnareArmorItemImageUrl(id: string): string | null {
  return SLAGSNARE_ARMOR_ITEM_ART.get(id) ?? null;
}
