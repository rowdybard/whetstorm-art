// Original paintings for obtainable Thornpeak leather armor.
const LEATHER_THORNPEAK_ITEM_ART = new Map<string, string>([
  ['cragmaw_prowlboots', '/ui/whetstorm/items/cragmaw_prowlboots.webp'],
  ['cragmaw_huntcord', '/ui/whetstorm/items/cragmaw_huntcord.webp'],
  ['nightwalk_jerkin', '/ui/whetstorm/items/nightwalk_jerkin.webp'],
  ['shadowmeld_tunic', '/ui/whetstorm/items/shadowmeld_tunic.webp'],
]);

export function leatherThornpeakItemImageUrl(id: string): string | null {
  return LEATHER_THORNPEAK_ITEM_ART.get(id) ?? null;
}
