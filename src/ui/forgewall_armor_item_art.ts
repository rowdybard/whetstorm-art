// Original Forgewall mail set paintings.
const FORGEWALL_ARMOR_ITEM_ART = new Map<string, string>([
  ['forgewall_chest', '/ui/whetstorm/items/forgewall_chest.webp'],
  ['forgewall_gloves', '/ui/whetstorm/items/forgewall_gloves.webp'],
  ['forgewall_legs', '/ui/whetstorm/items/forgewall_legs.webp'],
]);

export function forgewallArmorItemImageUrl(id: string): string | null {
  return FORGEWALL_ARMOR_ITEM_ART.get(id) ?? null;
}
