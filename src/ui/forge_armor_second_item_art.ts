// Original Emberfury and Forgewall mail paintings.
const FORGE_ARMOR_SECOND_ITEM_ART = new Map<string, string>([
  ['emberfury_gloves', '/ui/whetstorm/items/emberfury_gloves.webp'],
  ['emberfury_legs', '/ui/whetstorm/items/emberfury_legs.webp'],
  ['forgewall_helmet', '/ui/whetstorm/items/forgewall_helmet.webp'],
  ['forgewall_shoulder', '/ui/whetstorm/items/forgewall_shoulder.webp'],
]);

export function forgeArmorSecondItemImageUrl(id: string): string | null {
  return FORGE_ARMOR_SECOND_ITEM_ART.get(id) ?? null;
}
