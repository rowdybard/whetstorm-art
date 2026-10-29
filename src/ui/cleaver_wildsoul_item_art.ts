// Original paintings for two heroic weapons.
const CLEAVER_WILDSOUL_ITEM_ART = new Map<string, string>([
  ['gravewyrm_cleaver', '/ui/whetstorm/items/gravewyrm_cleaver.webp'],
  ['wildsoul_maul', '/ui/whetstorm/items/wildsoul_maul.webp'],
]);

export function cleaverWildsoulItemImageUrl(id: string): string | null {
  return CLEAVER_WILDSOUL_ITEM_ART.get(id) ?? null;
}
