// Original paintings for obtainable Thornpeak leather armor.
const LEATHER_THORNPEAK_THIRD_ITEM_ART = new Map<string, string>([
  ['moonbark_vestments', '/ui/whetstorm/items/moonbark_vestments.webp'],
  ['cragprowl_belt', '/ui/whetstorm/items/cragprowl_belt.webp'],
  ['stormroot_cowl', '/ui/whetstorm/items/stormroot_cowl.webp'],
  ['revenantstep_treads', '/ui/whetstorm/items/revenantstep_treads.webp'],
]);

export function leatherThornpeakThirdItemImageUrl(id: string): string | null {
  return LEATHER_THORNPEAK_THIRD_ITEM_ART.get(id) ?? null;
}
