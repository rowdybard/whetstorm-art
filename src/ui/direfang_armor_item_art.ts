// Original Direfang leather set paintings.
const DIREFANG_ARMOR_ITEM_ART = new Map<string, string>([
  ['nighttalon_crown', '/ui/whetstorm/items/nighttalon_crown.webp'],
  ['nighttalon_shoulderguards', '/ui/whetstorm/items/nighttalon_shoulderguards.webp'],
  ['nighttalon_grips', '/ui/whetstorm/items/nighttalon_grips.webp'],
  ['nighttalon_waistband', '/ui/whetstorm/items/nighttalon_waistband.webp'],
]);

export function direfangArmorItemImageUrl(id: string): string | null {
  return DIREFANG_ARMOR_ITEM_ART.get(id) ?? null;
}
