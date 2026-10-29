// Original paintings for heroic mail armor.
const HEROIC_MAIL_ORIGINAL_ITEM_ART = new Map<string, string>([
  ['gravewyrm_claws', '/ui/whetstorm/items/gravewyrm_claws.webp'],
  ['gravescale_girdle', '/ui/whetstorm/items/gravescale_girdle.webp'],
  ['mistforged_pauldrons', '/ui/whetstorm/items/mistforged_pauldrons.webp'],
]);

export function heroicMailOriginalItemImageUrl(id: string): string | null {
  return HEROIC_MAIL_ORIGINAL_ITEM_ART.get(id) ?? null;
}
