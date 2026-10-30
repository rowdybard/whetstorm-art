// Original paintings for armor family collection deeds.
const ARMOR_FAMILIES_DEED_ART = new Map<string, string>([
  ['col_set_wyrmshadow', '/ui/whetstorm/deeds/col_set_wyrmshadow.webp'],
  ['col_set_necromancers', '/ui/whetstorm/deeds/col_set_necromancers.webp'],
  ['col_set_crownforged', '/ui/whetstorm/deeds/col_set_crownforged.webp'],
  ['col_set_nighttalon', '/ui/whetstorm/deeds/col_set_nighttalon.webp'],
]);

export function armorFamiliesDeedImageUrl(id: string): string | null {
  return ARMOR_FAMILIES_DEED_ART.get(id) ?? null;
}
