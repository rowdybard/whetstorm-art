// Original Thornpeak trophy reagent paintings, keyed by authored item id.
const THORNPEAK_TROPHY_MATERIAL_ART = new Map<string, string>([
  ['old_cragmaws_pelt', '/ui/whetstorm/items/old_cragmaws_pelt.webp'],
  ['cracked_ogre_tusk', '/ui/whetstorm/items/cracked_ogre_tusk.webp'],
  ['emberwing_cinderscale', '/ui/whetstorm/items/emberwing_cinderscale.webp'],
]);

export function thornpeakTrophyMaterialItemImageUrl(id: string): string | null {
  return THORNPEAK_TROPHY_MATERIAL_ART.get(id) ?? null;
}
