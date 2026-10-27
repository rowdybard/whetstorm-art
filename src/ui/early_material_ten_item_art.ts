// Original early fishing item paintings in a closed map.
const EARLY_MATERIAL_TEN_ART = new Map<string, string>([
  ['raw_river_perch', '/ui/whetstorm/items/raw_river_perch.webp'],
  ['soggy_boot', '/ui/whetstorm/items/soggy_boot.webp'],
  ['tangled_weed', '/ui/whetstorm/items/tangled_weed.webp'],
  ['glimmerfin_koi', '/ui/whetstorm/items/glimmerfin_koi.webp'],
]);

export function earlyMaterialTenItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_TEN_ART.get(id) ?? null;
}
