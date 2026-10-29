// Original paintings for two Thornpeak raid weapons.
const COURTIER_WARD_ITEM_ART = new Map<string, string>([
  ['courtiers_bonefang', '/ui/whetstorm/items/courtiers_bonefang.webp'],
  ['thornpeak_wardblade', '/ui/whetstorm/items/thornpeak_wardblade.webp'],
]);

export function courtierWardItemImageUrl(id: string): string | null {
  return COURTIER_WARD_ITEM_ART.get(id) ?? null;
}
