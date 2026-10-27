// Individually painted, original Whetstorm art for early creature drops.
const EARLY_DROPS_ITEM_ART = new Map<string, string>([
  ['wolf_fang', '/ui/whetstorm/items/wolf_fang.webp'],
  ['boar_hide', '/ui/whetstorm/items/boar_hide.webp'],
  ['tough_jerky', '/ui/whetstorm/items/tough_jerky.webp'],
  ['spider_leg', '/ui/whetstorm/items/spider_leg.webp'],
]);

export function earlyDropsItemImageUrl(id: string): string | null {
  return EARLY_DROPS_ITEM_ART.get(id) ?? null;
}
