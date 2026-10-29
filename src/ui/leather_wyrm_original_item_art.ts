// Original paintings for obtainable wyrm-themed leather armor.
const LEATHER_WYRM_ORIGINAL_ITEM_ART = new Map<string, string>([
  ['wyrmscale_jerkin', '/ui/whetstorm/items/wyrmscale_jerkin.webp'],
  ['gravewyrm_stalkers_treads', '/ui/whetstorm/items/gravewyrm_stalkers_treads.webp'],
  ['wyrmshadow_harness', '/ui/whetstorm/items/wyrmshadow_harness.webp'],
  ['wyrmshadow_treads', '/ui/whetstorm/items/wyrmshadow_treads.webp'],
]);

export function leatherWyrmOriginalItemImageUrl(id: string): string | null {
  return LEATHER_WYRM_ORIGINAL_ITEM_ART.get(id) ?? null;
}
