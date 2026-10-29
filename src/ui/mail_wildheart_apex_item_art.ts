// Original, individually painted Whetstorm mail armor.
const MAIL_WILDHEART_APEX_ART = new Map<string, string>([
  ['bloodmane_warleggings', '/ui/whetstorm/items/bloodmane_warleggings.webp'],
  ['spiritweld_girdle', '/ui/whetstorm/items/spiritweld_girdle.webp'],
  ['forgefold_legguards', '/ui/whetstorm/items/forgefold_legguards.webp'],
  ['wardspeaker_sabatons', '/ui/whetstorm/items/wardspeaker_sabatons.webp'],
]);

export function mailWildheartApexItemImageUrl(id: string): string | null {
  return MAIL_WILDHEART_APEX_ART.get(id) ?? null;
}
