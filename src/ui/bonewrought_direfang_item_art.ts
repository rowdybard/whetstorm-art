// Original paintings for two raid blades.
const BONEWROUGHT_DIREFANG_ITEM_ART = new Map<string, string>([
  ['bonewrought_greatsword', '/ui/whetstorm/items/bonewrought_greatsword.webp'],
  ['direfang_greatblade', '/ui/whetstorm/items/direfang_greatblade.webp'],
]);

export function bonewroughtDirefangItemImageUrl(id: string): string | null {
  return BONEWROUGHT_DIREFANG_ITEM_ART.get(id) ?? null;
}
