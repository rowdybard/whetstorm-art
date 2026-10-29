// Original paintings for delve and Amberfall cloth armor.
const CLOTH_DELVE_AMBERFALL_ITEM_ART = new Map<string, string>([
  ['varric_shadow_cowl', '/ui/whetstorm/items/varric_shadow_cowl.webp'],
  ['sunken_reliquary_hood', '/ui/whetstorm/items/sunken_reliquary_hood.webp'],
  ['orchard_sapbinder_grips', '/ui/whetstorm/items/orchard_sapbinder_grips.webp'],
  ['mantle_of_the_meredark', '/ui/whetstorm/items/mantle_of_the_meredark.webp'],
]);

export function clothDelveAmberfallItemImageUrl(id: string): string | null {
  return CLOTH_DELVE_AMBERFALL_ITEM_ART.get(id) ?? null;
}
