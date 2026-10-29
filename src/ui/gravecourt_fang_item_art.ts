// Original paintings for two raid weapons.
const GRAVECOURT_FANG_ITEM_ART = new Map<string, string>([
  ['gravecourt_hewer', '/ui/whetstorm/items/gravecourt_hewer.webp'],
  ['fang_of_korzul', '/ui/whetstorm/items/fang_of_korzul.webp'],
]);

export function gravecourtFangItemImageUrl(id: string): string | null {
  return GRAVECOURT_FANG_ITEM_ART.get(id) ?? null;
}
