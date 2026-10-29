// Individually painted epic-map buried hoard jewelry.
const HOARD_JEWELRY = new Map<string, string>([
  ['collapsar_band_of_nyxaris', '/ui/whetstorm/items/collapsar_band_of_nyxaris.webp'],
  ['chained_ember_choker', '/ui/whetstorm/items/chained_ember_choker.webp'],
  ['band_mountains_weight', '/ui/whetstorm/items/band_mountains_weight.webp'],
]);

export function hoardJewelryItemImageUrl(id: string): string | null {
  return HOARD_JEWELRY.get(id) ?? null;
}
