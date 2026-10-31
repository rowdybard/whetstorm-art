// Original Dawnweave armor paintings.
const DAWNWEAVE_ARMOR_ART = new Map<string, string>([
  ['benison_dawnweave_helmet', '/ui/whetstorm/items/benison_dawnweave_helmet.webp'],
  ['benison_dawnweave_shoulder', '/ui/whetstorm/items/benison_dawnweave_shoulder.webp'],
  ['benison_dawnweave_chest', '/ui/whetstorm/items/benison_dawnweave_chest.webp'],
  ['benison_dawnweave_gloves', '/ui/whetstorm/items/benison_dawnweave_gloves.webp'],
  ['benison_dawnweave_legs', '/ui/whetstorm/items/benison_dawnweave_legs.webp'],
]);

export function dawnweaveArmorItemImageUrl(id: string): string | null {
  return DAWNWEAVE_ARMOR_ART.get(id) ?? null;
}
