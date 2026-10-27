// Original early-world item paintings in a closed map.
const EARLY_MATERIAL_FIVE_ART = new Map<string, string>([
  ['ghostly_essence', '/ui/whetstorm/items/ghostly_essence.webp'],
  ['restless_skull', '/ui/whetstorm/items/restless_skull.webp'],
  ['wolfhide_satchel', '/ui/whetstorm/items/wolfhide_satchel.webp'],
  ['cracked_fetish', '/ui/whetstorm/items/cracked_fetish.webp'],
]);

export function earlyMaterialFiveItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_FIVE_ART.get(id) ?? null;
}
