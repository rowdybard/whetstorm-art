// Original paintings for Sanctum mail armor.
const SANCTUM_MAIL_ITEM_ART = new Map<string, string>([
  ['boundstone_helm', '/ui/whetstorm/items/boundstone_helm.webp'],
  ['boundstone_girdle', '/ui/whetstorm/items/boundstone_girdle.webp'],
  ['gravewyrm_mantle', '/ui/whetstorm/items/gravewyrm_mantle.webp'],
  ['gravewyrm_gauntlets', '/ui/whetstorm/items/gravewyrm_gauntlets.webp'],
]);

export function sanctumMailItemImageUrl(id: string): string | null {
  return SANCTUM_MAIL_ITEM_ART.get(id) ?? null;
}
