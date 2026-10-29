// Original paintings for heroic leather armor.
const HEROIC_LEATHER_ORIGINAL_ITEM_ART = new Map<string, string>([
  ['bonechill_striders', '/ui/whetstorm/items/bonechill_striders.webp'],
  ['bonechill_cord', '/ui/whetstorm/items/bonechill_cord.webp'],
  ['sanctum_prowlers_grips', '/ui/whetstorm/items/sanctum_prowlers_grips.webp'],
]);

export function heroicLeatherOriginalItemImageUrl(id: string): string | null {
  return HEROIC_LEATHER_ORIGINAL_ITEM_ART.get(id) ?? null;
}
