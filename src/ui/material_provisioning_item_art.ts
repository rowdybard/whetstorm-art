// Original provisioning material paintings in a closed map.
const MATERIAL_PROVISIONING_ART = new Map<string, string>([
  ['cooking_salt', '/ui/whetstorm/items/cooking_salt.webp'],
  ['prime_cut', '/ui/whetstorm/items/prime_cut.webp'],
  ['highland_barley', '/ui/whetstorm/items/highland_barley.webp'],
  ['frost_gourd', '/ui/whetstorm/items/frost_gourd.webp'],
]);

export function materialProvisioningItemImageUrl(id: string): string | null {
  return MATERIAL_PROVISIONING_ART.get(id) ?? null;
}
