// Original paintings for two aquatic weapons.
const MIST_LUNAR_ITEM_ART = new Map<string, string>([
  ['mistcallers_fang', '/ui/whetstorm/items/mistcallers_fang.webp'],
  ['lunar_tide_greatstaff', '/ui/whetstorm/items/lunar_tide_greatstaff.webp'],
]);

export function mistLunarItemImageUrl(id: string): string | null {
  return MIST_LUNAR_ITEM_ART.get(id) ?? null;
}
