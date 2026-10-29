// Original forge mail paintings.
const FORGE_ARMOR_ITEM_ART = new Map<string, string>([
  ['slagbreaker_legs', '/ui/whetstorm/items/slagbreaker_legs.webp'],
  ['emberfury_helmet', '/ui/whetstorm/items/emberfury_helmet.webp'],
  ['emberfury_shoulder', '/ui/whetstorm/items/emberfury_shoulder.webp'],
  ['emberfury_chest', '/ui/whetstorm/items/emberfury_chest.webp'],
]);

export function forgeArmorItemImageUrl(id: string): string | null {
  return FORGE_ARMOR_ITEM_ART.get(id) ?? null;
}
