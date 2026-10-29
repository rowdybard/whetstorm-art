// Original Packlord Emberhide leather set paintings.
const PACKLORD_ARMOR_ITEM_ART = new Map<string, string>([
  ['packlord_emberhide_helmet', '/ui/whetstorm/items/packlord_emberhide_helmet.webp'],
  ['packlord_emberhide_shoulder', '/ui/whetstorm/items/packlord_emberhide_shoulder.webp'],
  ['packlord_emberhide_chest', '/ui/whetstorm/items/packlord_emberhide_chest.webp'],
  ['packlord_emberhide_gloves', '/ui/whetstorm/items/packlord_emberhide_gloves.webp'],
  ['packlord_emberhide_legs', '/ui/whetstorm/items/packlord_emberhide_legs.webp'],
]);

export function packlordArmorItemImageUrl(id: string): string | null {
  return PACKLORD_ARMOR_ITEM_ART.get(id) ?? null;
}
