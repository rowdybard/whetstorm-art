// Original paintings for obtainable Thornpeak leather armor.
const LEATHER_PEAK_NEXT_ITEM_ART = new Map<string, string>([
  ['stalkerhide_jerkin', '/ui/whetstorm/items/stalkerhide_jerkin.webp'],
  ['cragwalker_boots', '/ui/whetstorm/items/cragwalker_boots.webp'],
  ['windguard_leggings', '/ui/whetstorm/items/windguard_leggings.webp'],
  ['wildgrove_cinch', '/ui/whetstorm/items/wildgrove_cinch.webp'],
]);

export function leatherPeakNextItemImageUrl(id: string): string | null {
  return LEATHER_PEAK_NEXT_ITEM_ART.get(id) ?? null;
}
