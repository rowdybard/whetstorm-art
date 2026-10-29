// Original individually painted Whetstorm mail armor.
const MAIL_OSMIUM_ART = new Map<string, string>([
  ['outrider_sabatons', '/ui/whetstorm/items/outrider_sabatons.webp'],
  ['thoriumscale_greathelm', '/ui/whetstorm/items/thoriumscale_greathelm.webp'],
  ['thoriumscale_cuirass', '/ui/whetstorm/items/thoriumscale_cuirass.webp'],
  ['thoriumscale_leggings', '/ui/whetstorm/items/thoriumscale_leggings.webp'],
]);
export function mailOsmiumItemImageUrl(id: string): string | null {
  return MAIL_OSMIUM_ART.get(id) ?? null;
}
