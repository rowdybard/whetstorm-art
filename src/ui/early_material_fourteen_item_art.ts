// Original early marsh material paintings in a closed map.
const EARLY_MATERIAL_FOURTEEN_ART = new Map<string, string>([
  ['chipped_tusk', '/ui/whetstorm/items/chipped_tusk.webp'],
  ['bogiron_nugget', '/ui/whetstorm/items/bogiron_nugget.webp'],
  ['grubjaw_tusk', '/ui/whetstorm/items/grubjaw_tusk.webp'],
  ['cult_cipher', '/ui/whetstorm/items/cult_cipher.webp'],
]);

export function earlyMaterialFourteenItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_FOURTEEN_ART.get(id) ?? null;
}
