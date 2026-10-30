// Original paintings for the seventh October 30 item batch.
const OCT30_SEVENTH_ORIGINAL_ITEMS = new Map<string, string>([
  ['thornpeak_moonhide_cowl', '/ui/whetstorm/items/thornpeak_moonhide_cowl.webp'],
  ['stormhymn_chain_grips', '/ui/whetstorm/items/stormhymn_chain_grips.webp'],
  ['stormhymn_chain_treads', '/ui/whetstorm/items/stormhymn_chain_treads.webp'],
  ['wildgrowth_leggings', '/ui/whetstorm/items/wildgrowth_leggings.webp'],
  ['heroic_thornpeak_moonhide_cowl', '/ui/whetstorm/items/thornpeak_moonhide_cowl.webp'],
  ['heroic_stormhymn_chain_grips', '/ui/whetstorm/items/stormhymn_chain_grips.webp'],
  ['heroic_stormhymn_chain_treads', '/ui/whetstorm/items/stormhymn_chain_treads.webp'],
  ['heroic_wildgrowth_leggings', '/ui/whetstorm/items/wildgrowth_leggings.webp'],
]);

export function oct30SeventhOriginalItemImageUrl(id: string): string | null {
  return OCT30_SEVENTH_ORIGINAL_ITEMS.get(id) ?? null;
}
