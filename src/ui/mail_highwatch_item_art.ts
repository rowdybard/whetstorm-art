// Original paintings for Highwatch mail armor.
const MAIL_HIGHWATCH_ITEM_ART = new Map<string, string>([
  ['highwatch_wallshield', '/ui/whetstorm/items/highwatch_wallshield.webp'],
  ['highwatch_breastplate', '/ui/whetstorm/items/highwatch_breastplate.webp'],
  ['cragward_pauldrons', '/ui/whetstorm/items/cragward_pauldrons.webp'],
  ['stormchant_gauntlets', '/ui/whetstorm/items/stormchant_gauntlets.webp'],
]);

export function mailHighwatchItemImageUrl(id: string): string | null {
  return MAIL_HIGHWATCH_ITEM_ART.get(id) ?? null;
}
