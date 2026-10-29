// Original paintings for crafted group feast items.
const CRAFTED_GROUP_FEASTS_ART = new Map<string, string>([
  ['stonepot_feast', '/ui/whetstorm/items/stonepot_feast.webp'],
  ['warspice_feast', '/ui/whetstorm/items/warspice_feast.webp'],
  ['sageleaf_feast', '/ui/whetstorm/items/sageleaf_feast.webp'],
  ['harvest_feast', '/ui/whetstorm/items/harvest_feast.webp'],
]);

export function craftedGroupFeastsItemImageUrl(id: string): string | null {
  return CRAFTED_GROUP_FEASTS_ART.get(id) ?? null;
}
