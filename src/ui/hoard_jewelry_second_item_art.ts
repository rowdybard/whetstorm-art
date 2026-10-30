// Original paintings for two epic-map hoard accessories.
const HOARD_JEWELRY_SECOND = new Set(['seal_of_the_cryptwalker', 'pendant_continuous_flow']);

export function hoardJewelrySecondItemImageUrl(id: string): string | null {
  return HOARD_JEWELRY_SECOND.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
