// Original paintings for faction champion jewelry.
const JEWELRY_CHAMPIONS_ITEM_ART = new Map<string, string>([
  ['champion_rift_band', '/ui/whetstorm/items/champion_rift_band.webp'],
  ['riftwardens_pendant', '/ui/whetstorm/items/riftwardens_pendant.webp'],
  ['champion_dawn_medallion', '/ui/whetstorm/items/champion_dawn_medallion.webp'],
  ['champions_dawn_loop', '/ui/whetstorm/items/champions_dawn_loop.webp'],
]);

export function jewelryChampionsItemImageUrl(id: string): string | null {
  return JEWELRY_CHAMPIONS_ITEM_ART.get(id) ?? null;
}
